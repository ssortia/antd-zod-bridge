import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { z } from 'zod';
import { Button, Card, Divider, Typography, Tabs, Switch, ConfigProvider, theme } from 'antd';
import {
  CheckboxField,
  DateField,
  ListField,
  NumberField,
  PasswordField,
  PhoneField,
  RadioField,
  SelectField,
  TextAreaField,
  TextField,
  ZodForm
} from '@my/ui';
import { CustomField } from './components/CustomField';
import 'antd/dist/reset.css';

const { Title, Text } = Typography;

// Определяем Zod схему для демонстрации всех компонентов
const userFormSchema = z.object({
  // Текстовые поля
  firstName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  lastName: z.string().min(2, "Фамилия должна содержать минимум 2 символа"),
  email: z.string().email("Некорректный email адрес"),
  phone: z.string().min(11, "Введите корректный номер телефона").max(11, "Номер телефона должен содержать 11 цифр"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),

  // Числовые поля
  age: z.number().min(18, "Возраст должен быть не менее 18 лет").max(120, "Некорректный возраст"),
  salary: z.number().min(0, "Зарплата не может быть отрицательной").optional(),

  // Поля выбора
  country: z.string().min(1, "Выберите страну"),
  gender: z.enum(['male', 'female'], { required_error: "Выберите пол" }),

  // Чекбоксы и соглашения
  subscribe: z.boolean(),
  terms: z.boolean().refine(val => val === true, "Необходимо принять условия"),

  // Дата
  birthDate: z.date({ required_error: "Выберите дату рождения" }).nullable(),

  // Текстовая область
  bio: z.string()
    .min(10, "Биография должна содержать минимум 10 символов")
    .max(500, "Биография не должна превышать 500 символов")
    .optional(),

  // Кастомное поле для демонстрации fieldUtils
  customField: z.string().min(3, "Минимум 3 символа"),

  // Список контактов для демонстрации ListField
  contacts: z.array(z.object({
    name: z.string().min(1, "Имя контакта обязательно"),
    phone: z.string().min(1, "Телефон обязателен"),
    email: z.string().email("Некорректный email").optional()
  })).min(1, "Добавьте хотя бы один контакт"),
});

type UserFormData = z.infer<typeof userFormSchema>;

const countryOptions = [
  { label: 'Россия', value: 'russia' },
  { label: 'США', value: 'usa' },
  { label: 'Германия', value: 'germany' },
  { label: 'Франция', value: 'france' },
  { label: 'Великобритания', value: 'uk' },
];

const genderOptions = [
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' },
];

// Компонент для полной демо формы
function MainFormDemo() {
  const handleSubmit = (data: UserFormData) => {
    console.log('Отправленные данные:', data);
    alert('Форма успешно отправлена! Проверьте консоль для просмотра данных.');
  };

  return (
    <Card>
      <ZodForm schema={userFormSchema} onSubmit={handleSubmit}>
        <Title level={3}>Личная информация</Title>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <TextField
            name="firstName"
            label="Имя"
            placeholder="Введите ваше имя"
            required
          />

          <TextField
            name="lastName"
            label="Фамилия"
            placeholder="Введите вашу фамилию"
            required
          />
        </div>

        <TextField
          name="email"
          label="Email"
          placeholder="example@email.com"
          required
        />

        <PhoneField
          name="phone"
          label="Телефон"
          required
        />

        <PasswordField
          name="password"
          label="Пароль"
          placeholder="Введите пароль"
          required
        />

        <Divider />

        <Title level={4}>Дополнительная информация</Title>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <NumberField
            name="age"
            label="Возраст"
            placeholder="Введите ваш возраст"
            min={18}
            max={120}
            required
          />

          <NumberField
            name="salary"
            label="Зарплата (руб.)"
            placeholder="Введите зарплату"
            min={0}
            step={1000}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value?.replace(/,/g, '') as any}
          />
        </div>

        <SelectField
          name="country"
          label="Страна"
          placeholder="Выберите страну"
          options={countryOptions}
          showSearch
          required
        />

        <RadioField
          name="gender"
          label="Пол"
          options={genderOptions}
          direction="horizontal"
          required
        />

        <DateField
          name="birthDate"
          label="Дата рождения"
          placeholder="Выберите дату"
          format="DD.MM.YYYY"
          required
        />

        <TextAreaField
          name="bio"
          label="О себе"
          placeholder="Расскажите немного о себе..."
          rows={4}
          maxLength={500}
          showCount
        />

        <Divider />

        <Title level={4}>Список контактов</Title>

        <ListField
          name="contacts"
          label="Контакты"
          addButtonText="Добавить контакт"
          maxItems={5}
          minItems={1}
          required
        >
          {(index) => (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <TextField
                name={`contacts.${index}.name`}
                label="Имя контакта"
                placeholder="Введите имя"
                required
              />
              <PhoneField
                name={`contacts.${index}.phone`}
                label="Телефон"
                required
              />
              <div style={{ gridColumn: '1 / -1' }}>
                <TextField
                  name={`contacts.${index}.email`}
                  label="Email (необязательно)"
                  placeholder="contact@example.com"
                />
              </div>
            </div>
          )}
        </ListField>

        <Divider />

        <Title level={4}>Демонстрация fieldUtils</Title>

        <CustomField
          name="customField"
          label="Кастомное поле с fieldUtils"
          placeholder="Введите минимум 3 символа"
          required
        />

        <Divider />

        <Title level={4}>Согласия</Title>

        <CheckboxField name="subscribe">
          Подписаться на рассылку новостей
        </CheckboxField>

        <CheckboxField name="terms">
          Я принимаю <a href="#" onClick={(e) => e.preventDefault()}>условия использования</a> *
        </CheckboxField>

        <div style={{ marginTop: '24px' }}>
          <Button type="primary" htmlType="submit" size="large">
            Отправить форму
          </Button>
        </div>
      </ZodForm>
    </Card>
  );
}

// Компонент для демонстрации fieldUtils
function FieldUtilsDemo() {
  return (
    <Card>
      <Title level={3}>Демонстрация fieldUtils</Title>
      <Text>
        Кастомное поле использует утилиты из библиотеки для работы с ошибками:
      </Text>
      <ul style={{ marginTop: 16 }}>
        <li><code>hasError(error)</code> - проверяет наличие ошибки</li>
        <li><code>getFieldStatus(error)</code> - возвращает статус для Ant Design</li>
        <li><code>formatErrorMessage(error)</code> - форматирует сообщение об ошибке</li>
        <li><code>isRequired(required)</code> - проверяет обязательность поля</li>
      </ul>

      <div style={{ marginTop: '24px' }}>
        <ZodForm
          schema={z.object({
            customField: z.string().min(3, "Минимум 3 символа")
          })}
          onSubmit={(data) => console.log('Данные:', data)}
        >
          <CustomField
            name="customField"
            label="Кастомное поле с fieldUtils"
            placeholder="Введите минимум 3 символа"
            required
          />
          <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
            Проверить валидацию
          </Button>
        </ZodForm>
      </div>

      <Text type="secondary" style={{ display: 'block', marginTop: 16 }}>
        Попробуйте ввести менее 3 символов в поле выше, чтобы увидеть работу утилит.
      </Text>
    </Card>
  );
}

// Компонент для демонстрации CSS классов
function CSSClassesDemo() {
  return (
    <Card>
      <Title level={3}>Демонстрация CSS классов</Title>
      <Text>
        Пример формы с кастомными CSS классами для стилизации:
      </Text>

      <div style={{ marginTop: '16px' }}>
        <ZodForm
          schema={z.object({
            customStyledField: z.string().min(1, "Поле обязательно")
          })}
          onSubmit={() => {}}
          classes={{
            form: 'custom-form',
            content: 'custom-content'
          }}
          style={{
            border: '2px dashed #1890ff',
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: '#f0f9ff'
          }}
        >
          <TextField
            name="customStyledField"
            label="Поле с кастомными классами"
            placeholder="Введите текст"
            required
            classes={{
              field: 'custom-field',
              label: 'custom-label',
              error: 'custom-error',
              labelRequired: 'custom-required'
            }}
          />
          <Button type="primary" htmlType="submit">
            Проверить стили
          </Button>
        </ZodForm>
      </div>

      <div style={{ marginTop: '16px' }}>
        <Text type="secondary">
          Добавьте следующие CSS классы в ваш проект для кастомизации стилей:
        </Text>
        <pre style={{
          backgroundColor: '#f5f5f5',
          padding: '12px',
          borderRadius: '4px',
          marginTop: '8px',
          fontSize: '12px'
        }}>
{`.custom-form { border: 2px dashed #52c41a !important; }
.custom-field { background: #f6ffed; padding: 8px; }
.custom-label { color: #52c41a; font-weight: bold; }
.custom-error { color: #ff7875; font-style: italic; }
.custom-required { color: #ff4d4f; font-size: 16px; }`}
        </pre>
      </div>
    </Card>
  );
}

// Компонент для демонстрации ListField
function ListFieldDemo() {
  return (
    <Card>
      <Title level={3}>Демонстрация ListField</Title>
      <Text>
        Различные варианты использования компонента ListField для работы с динамическими списками:
      </Text>

      <Divider />

      {/* Простой список строк */}
      <Title level={4}>Простой список задач</Title>
      <ZodForm
        schema={z.object({
          tasks: z.array(z.object({
            task: z.string().min(1, "Задача не может быть пустой")
          })).min(1, "Добавьте хотя бы одну задачу")
        })}
        onSubmit={(data) => console.log('Задачи:', data.tasks)}
      >
        <ListField
          name="tasks"
          label="Список задач"
          addButtonText="Добавить задачу"
          maxItems={10}
          showItemNumbers={true}
        >
          {(index) => (
            <TextField
              name={`tasks.${index}.task`}
              label={`Задача ${index + 1}`}
              placeholder="Введите описание задачи"
              required
            />
          )}
        </ListField>
        <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
          Сохранить задачи
        </Button>
      </ZodForm>

      <Divider />

      {/* Список с вложенными объектами */}
      <Title level={4}>Список покупок с деталями</Title>
      <ZodForm
        schema={z.object({
          shoppingList: z.array(z.object({
            item: z.string().min(1, "Название товара обязательно"),
            quantity: z.number().min(1, "Количество должно быть больше 0"),
            price: z.number().min(0, "Цена не может быть отрицательной").optional(),
            category: z.enum(['food', 'electronics', 'clothing', 'other'], { required_error: "Выберите категорию" })
          })).max(20, "Максимум 20 товаров")
        })}
        onSubmit={(data) => console.log('Список покупок:', data.shoppingList)}
      >
        <ListField
          name="shoppingList"
          label="Список покупок"
          addButtonText="Добавить товар"
          maxItems={20}
          showItemNumbers={false}
          classes={{
            addButton: 'shopping-add-btn',
            item: 'shopping-item'
          }}
        >
          {(index) => (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '12px', alignItems: 'end' }}>
              <TextField
                name={`shoppingList.${index}.item`}
                label="Товар"
                placeholder="Название товара"
                required
              />
              <NumberField
                name={`shoppingList.${index}.quantity`}
                label="Количество"
                placeholder="1"
                min={1}
                required
              />
              <NumberField
                name={`shoppingList.${index}.price`}
                label="Цена (руб.)"
                placeholder="0"
                min={0}
                step={0.01}
              />
              <SelectField
                name={`shoppingList.${index}.category`}
                label="Категория"
                placeholder="Выберите"
                options={[
                  { label: 'Продукты', value: 'food' },
                  { label: 'Электроника', value: 'electronics' },
                  { label: 'Одежда', value: 'clothing' },
                  { label: 'Другое', value: 'other' }
                ]}
                required
              />
            </div>
          )}
        </ListField>
        <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
          Сохранить список
        </Button>
      </ZodForm>

      <div style={{ marginTop: '16px' }}>
        <Text type="secondary">
          <strong>Возможности ListField:</strong>
        </Text>
        <ul style={{ marginTop: 8 }}>
          <li>Динамическое добавление и удаление элементов</li>
          <li>Настройка минимального и максимального количества элементов</li>
          <li>Кастомизация текста кнопки добавления</li>
          <li>Возможность скрыть/показать номера элементов</li>
          <li>Поддержка вложенных форм с любыми полями</li>
          <li>Кастомные CSS классы для стилизации</li>
          <li>Автоматическая валидация через Zod схему</li>
        </ul>
      </div>
    </Card>
  );
}

// Компонент с инструкциями
function InstructionsTab() {
  return (
    <Card>
      <Title level={3}>Инструкции по использованию</Title>
      <ul style={{ marginBottom: 24 }}>
        <li>Все поля имеют валидацию через Zod схему</li>
        <li>Обязательные поля отмечены звездочкой (*)</li>
        <li>Ошибки валидации отображаются в реальном времени</li>
        <li>Форма не отправится, пока не будут исправлены все ошибки</li>
        <li>После успешной отправки данные выводятся в консоль</li>
        <li>Используйте пропс <code>classes</code> для кастомизации стилей компонентов</li>
        <li>ListField позволяет создавать динамические списки с добавлением/удалением элементов</li>
      </ul>

      <Title level={4}>Доступные компоненты</Title>
      <ul>
        <li><strong>ZodForm</strong> - Основной компонент формы с интеграцией Zod</li>
        <li><strong>TextField</strong> - Текстовое поле</li>
        <li><strong>PhoneField</strong> - Поле для ввода телефона с маской российского номера</li>
        <li><strong>PasswordField</strong> - Поле для пароля</li>
        <li><strong>TextAreaField</strong> - Многострочное текстовое поле</li>
        <li><strong>NumberField</strong> - Числовое поле</li>
        <li><strong>SelectField</strong> - Выпадающий список</li>
        <li><strong>RadioField</strong> - Радио-кнопки</li>
        <li><strong>CheckboxField</strong> - Чекбокс</li>
        <li><strong>DateField</strong> - Выбор даты</li>
        <li><strong>ListField</strong> - Динамический список</li>
      </ul>
    </Card>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Сохраняем состояние темы в localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    // Обновляем data-theme атрибут для CSS переменных нашей библиотеки
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const tabItems = [
    {
      key: '1',
      label: 'Полная форма',
      children: <MainFormDemo />
    },
    {
      key: '2',
      label: 'Field Helpers',
      children: <FieldUtilsDemo />
    },
    {
      key: '3',
      label: 'CSS классы',
      children: <CSSClassesDemo />
    },
    {
      key: '4',
      label: 'ListField',
      children: <ListFieldDemo />
    },
    {
      key: '5',
      label: 'Инструкции',
      children: <InstructionsTab />
    }
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <div style={{ 
        padding: '24px', 
        maxWidth: '1200px', 
        margin: '0 auto',
        minHeight: '100vh',
        backgroundColor: isDarkMode ? '#141414' : '#ffffff'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div>
            <Title level={1}>Antd Zod Bridge - Демонстрация компонентов</Title>
            <Text type="secondary">
              Пример использования всех доступных компонентов формы с валидацией Zod
            </Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Text>🌞</Text>
            <Switch 
              checked={isDarkMode}
              onChange={setIsDarkMode}
              checkedChildren="🌙"
              unCheckedChildren="☀️"
            />
            <Text>🌙</Text>
          </div>
        </div>
        
        <Tabs
          defaultActiveKey="1"
          items={tabItems}
          style={{ marginTop: '24px' }}
          size="large"
        />
      </div>
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
