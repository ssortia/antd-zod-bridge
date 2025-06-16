import React from 'react';
import ReactDOM from 'react-dom/client';
import { z } from 'zod';
import { Button, Card, Space, Typography, Divider } from 'antd';
import { 
  ZodForm, 
  TextField, 
  PasswordField,
  NumberField, 
  SelectField, 
  CheckboxField, 
  RadioField, 
  DateField,
  TextAreaField,
  hasError,
  getFieldStatus,
  formatErrorMessage,
  isRequired
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
  
  // Кастомное поле для демонстрации fieldHelpers
  customField: z.string().min(3, "Минимум 3 символа"),
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

function App() {
  const handleSubmit = (data: UserFormData) => {
    console.log('Отправленные данные:', data);
    alert('Форма успешно отправлена! Проверьте консоль для просмотра данных.');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={1}>Antd Zod Bridge - Демонстрация компонентов</Title>
      <Text type="secondary">
        Пример использования всех доступных компонентов формы с валидацией Zod
      </Text>
      
      <Card style={{ marginTop: '24px' }}>
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
            
            <Title level={4}>Демонстрация fieldHelpers</Title>
            
            <CustomField
              name="customField"
              label="Кастомное поле с fieldHelpers"
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
      
      <Card style={{ marginTop: '24px' }}>
        <Title level={3}>Демонстрация fieldHelpers</Title>
        <Text>
          Кастомное поле выше использует утилиты из библиотеки для работы с ошибками:
        </Text>
        <ul style={{ marginTop: 16 }}>
          <li><code>hasError(error)</code> - проверяет наличие ошибки</li>
          <li><code>getFieldStatus(error)</code> - возвращает статус для Ant Design</li>
          <li><code>formatErrorMessage(error)</code> - форматирует сообщение об ошибке</li>
          <li><code>isRequired(required)</code> - проверяет обязательность поля</li>
        </ul>
        <Text type="secondary">
          Попробуйте ввести менее 3 символов в кастомное поле, чтобы увидеть работу утилит.
        </Text>
      </Card>
      
      <Card style={{ marginTop: '24px' }}>
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
      
      <Card style={{ marginTop: '24px' }}>
        <Title level={3}>Инструкции</Title>
        <ul>
          <li>Все поля имеют валидацию через Zod схему</li>
          <li>Обязательные поля отмечены звездочкой (*)</li>
          <li>Ошибки валидации отображаются в реальном времени</li>
          <li>Форма не отправится, пока не будут исправлены все ошибки</li>
          <li>После успешной отправки данные выводятся в консоль</li>
          <li>Используйте пропс <code>classes</code> для кастомизации стилей компонентов</li>
        </ul>
      </Card>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
