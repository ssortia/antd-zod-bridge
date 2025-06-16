import React, { useCallback } from 'react';
import { Button, Space, Card, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { BaseFieldProps } from '../types';
import { StyleClasses } from '../types/styles';

const { Text } = Typography;

export interface ListFieldProps extends Omit<BaseFieldProps, 'size' | 'label'> {
  /** Метка для списка */
  label?: string;
  /** Функция рендеринга элемента массива */
  children: (index: number, remove: () => void) => React.ReactNode;
  /** Заголовок для списка */
  title?: string;
  /** Текст кнопки добавления */
  addButtonText?: string;
  /** Максимальное количество элементов */
  maxItems?: number;
  /** Минимальное количество элементов */
  minItems?: number;
  /** Показывать ли номера элементов */
  showItemNumbers?: boolean;
  /** Кастомные CSS классы */
  classes?: StyleClasses & {
    list?: string;
    item?: string;
    addButton?: string;
    removeButton?: string;
    header?: string;
    title?: string;
  };
}

/**
 * Компонент для работы с динамическими массивами
 * Позволяет добавлять и удалять элементы списка
 */
export default function ListField({
  name,
  label,
  title,
  addButtonText = 'Добавить элемент',
  maxItems,
  minItems = 0,
  showItemNumbers = true,
  required = false,
  disabled = false,
  className,
  style,
  classes,
  children
}: ListFieldProps) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const handleAdd = useCallback(() => {
    // Добавляем пустой объект или значение по умолчанию
    append({});
  }, [append]);

  const handleRemove = useCallback((index: number) => {
    remove(index);
  }, [remove]);

  const canAdd = !maxItems || fields.length < maxItems;
  const canRemove = fields.length > minItems;

  // Собираем CSS классы
  const fieldClassName = [
    'azb-list-field',
    classes?.field,
    className
  ].filter(Boolean).join(' ');

  const listClassName = [
    'azb-list-field-list',
    classes?.list
  ].filter(Boolean).join(' ');

  const itemClassName = [
    'azb-list-field-item',
    classes?.item
  ].filter(Boolean).join(' ');

  const headerClassName = [
    'azb-list-field-header',
    classes?.header
  ].filter(Boolean).join(' ');

  const titleClassName = [
    'azb-list-field-title',
    classes?.title
  ].filter(Boolean).join(' ');

  return (
    <div className={fieldClassName} style={style}>
      {/* Заголовок списка */}
      <div className={headerClassName}>
        {label && (
          <Text className={titleClassName} strong>
            {label}
            {required && (
              <span className="azb-field-label-required" style={{ color: '#ff4d4f', marginLeft: 4 }}>
                *
              </span>
            )}
          </Text>
        )}
        {title && !label && (
          <Text className={titleClassName} strong>
            {title}
          </Text>
        )}
      </div>

      {/* Список элементов */}
      <div className={listClassName}>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          {fields.map((field, index) => (
            <Card
              key={field.id}
              className={itemClassName}
              size="small"
              title={
                showItemNumbers ? (
                  <Text type="secondary">
                    Элемент {index + 1}
                  </Text>
                ) : undefined
              }
              extra={
                canRemove && !disabled ? (
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemove(index)}
                    className={classes?.removeButton}
                    title="Удалить элемент"
                  />
                ) : null
              }
              styles={{
                body: { padding: '12px' }
              }}
            >
              {children(index, () => handleRemove(index))}
            </Card>
          ))}

          {/* Сообщение когда список пуст */}
          {fields.length === 0 && (
            <Card size="small" style={{ textAlign: 'center', border: '1px dashed #d9d9d9' }}>
              <Text type="secondary">Список пуст. Нажмите кнопку ниже, чтобы добавить элемент.</Text>
            </Card>
          )}
        </Space>
      </div>

      {/* Кнопка добавления */}
      <div style={{ marginTop: 16 }}>
        <Button
          type="dashed"
          onClick={handleAdd}
          disabled={!canAdd || disabled}
          icon={<PlusOutlined />}
          className={classes?.addButton}
          block
        >
          {addButtonText}
          {maxItems && ` (${fields.length}/${maxItems})`}
        </Button>
      </div>

      {/* Информация об ограничениях */}
      {(minItems > 0 || maxItems) && (
        <div style={{ marginTop: 8 }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {minItems > 0 && maxItems && (
              `Количество элементов: от ${minItems} до ${maxItems}`
            )}
            {minItems > 0 && !maxItems && (
              `Минимум элементов: ${minItems}`
            )}
            {!minItems && maxItems && (
              `Максимум элементов: ${maxItems}`
            )}
          </Text>
        </div>
      )}

    </div>
  );
}