/**
 * Типы для кастомизации стилей компонентов
 */

export interface StyleClasses {
  /** Основной контейнер поля */
  field?: string;
  /** Метка поля */
  label?: string;
  /** Метка поля в состоянии ошибки */
  labelError?: string;
  /** Индикатор обязательного поля */
  labelRequired?: string;
  /** Контейнер сообщения об ошибке */
  error?: string;
  /** Контейнер элемента ввода */
  input?: string;
}

export interface FormStyleClasses {
  /** Основной контейнер формы */
  form?: string;
  /** Контейнер содержимого формы */
  content?: string;
}

/**
 * Пропы для кастомизации стилей
 */
export interface StyleProps {
  /** Кастомные CSS классы */
  classes?: StyleClasses;
  /** Inline стили (для обратной совместимости) */
  style?: React.CSSProperties;
  /** CSS класс (для обратной совместимости) */
  className?: string;
}