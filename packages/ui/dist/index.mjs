// src/ZodForm.tsx
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// src/locale.ts
import { z } from "zod";
var zodRuLocale = (issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.received === "undefined" || issue.received === "null") {
        return { message: "\u041F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F" };
      }
      if (issue.expected === "string") {
        return { message: "\u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u0441\u0442\u0440\u043E\u043A\u0430" };
      }
      if (issue.expected === "number") {
        return { message: "\u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u0447\u0438\u0441\u043B\u043E" };
      }
      if (issue.expected === "boolean") {
        return { message: "\u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u0431\u0443\u043B\u0435\u0432\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435" };
      }
      if (issue.expected === "date") {
        return { message: "\u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F \u0434\u0430\u0442\u0430" };
      }
      return { message: `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0442\u0438\u043F \u0434\u0430\u043D\u043D\u044B\u0445. \u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F ${issue.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${issue.received}` };
    case z.ZodIssueCode.invalid_literal:
      return { message: `\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435. \u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F ${issue.expected}` };
    case z.ZodIssueCode.unrecognized_keys:
      return { message: `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D\u044B\u0435 \u043A\u043B\u044E\u0447\u0438 \u0432 \u043E\u0431\u044A\u0435\u043A\u0442\u0435: ${issue.keys.map((k) => `'${k}'`).join(", ")}` };
    case z.ZodIssueCode.invalid_union:
      return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435" };
    case z.ZodIssueCode.invalid_union_discriminator:
      return { message: `\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0434\u0438\u0441\u043A\u0440\u0438\u043C\u0438\u043D\u0430\u0442\u043E\u0440\u0430. \u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F ${issue.options.join(" | ")}` };
    case z.ZodIssueCode.invalid_enum_value:
      return { message: `\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0435\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F. \u041E\u0436\u0438\u0434\u0430\u0435\u0442\u0441\u044F ${issue.options?.join(" | ")}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E '${issue.received}'` };
    case z.ZodIssueCode.invalid_arguments:
      return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0430\u0440\u0433\u0443\u043C\u0435\u043D\u0442\u044B \u0444\u0443\u043D\u043A\u0446\u0438\u0438" };
    case z.ZodIssueCode.invalid_return_type:
      return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0442\u0438\u043F \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u043C\u043E\u0433\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F" };
    case z.ZodIssueCode.invalid_date:
      return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u0430\u044F \u0434\u0430\u0442\u0430" };
    case z.ZodIssueCode.invalid_string:
      if (issue.validation === "email") {
        return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 email \u0430\u0434\u0440\u0435\u0441" };
      }
      if (issue.validation === "url") {
        return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 URL" };
      }
      if (issue.validation === "uuid") {
        return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 UUID" };
      }
      if (issue.validation === "cuid") {
        return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 CUID" };
      }
      if (issue.validation === "regex") {
        return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442" };
      }
      if (issue.validation === "datetime") {
        return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0434\u0430\u0442\u044B \u0438 \u0432\u0440\u0435\u043C\u0435\u043D\u0438" };
      }
      return { message: `\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: ${issue.validation}` };
    case z.ZodIssueCode.too_small:
      if (issue.type === "array") {
        return {
          message: issue.exact ? `\u041C\u0430\u0441\u0441\u0438\u0432 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0440\u043E\u0432\u043D\u043E ${issue.minimum} \u044D\u043B\u0435\u043C\u0435\u043D\u0442(\u043E\u0432)` : issue.inclusive ? `\u041C\u0430\u0441\u0441\u0438\u0432 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 ${issue.minimum} \u044D\u043B\u0435\u043C\u0435\u043D\u0442(\u043E\u0432)` : `\u041C\u0430\u0441\u0441\u0438\u0432 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0431\u043E\u043B\u0435\u0435 ${issue.minimum} \u044D\u043B\u0435\u043C\u0435\u043D\u0442(\u043E\u0432)`
        };
      }
      if (issue.type === "string") {
        return {
          message: issue.exact ? `\u0421\u0442\u0440\u043E\u043A\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0440\u043E\u0432\u043D\u043E ${issue.minimum} \u0441\u0438\u043C\u0432\u043E\u043B(\u043E\u0432)` : issue.inclusive ? `\u0421\u0442\u0440\u043E\u043A\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 ${issue.minimum} \u0441\u0438\u043C\u0432\u043E\u043B(\u043E\u0432)` : `\u0421\u0442\u0440\u043E\u043A\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0431\u043E\u043B\u0435\u0435 ${issue.minimum} \u0441\u0438\u043C\u0432\u043E\u043B(\u043E\u0432)`
        };
      }
      if (issue.type === "number") {
        return {
          message: issue.exact ? `\u0427\u0438\u0441\u043B\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0440\u0430\u0432\u043D\u043E ${issue.minimum}` : issue.inclusive ? `\u0427\u0438\u0441\u043B\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 ${issue.minimum}` : `\u0427\u0438\u0441\u043B\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0435 ${issue.minimum}`
        };
      }
      if (issue.type === "date") {
        return {
          message: issue.exact ? `\u0414\u0430\u0442\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0440\u0430\u0432\u043D\u0430 ${new Date(Number(issue.minimum))}` : issue.inclusive ? `\u0414\u0430\u0442\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u043D\u0435 \u0440\u0430\u043D\u044C\u0448\u0435 ${new Date(Number(issue.minimum))}` : `\u0414\u0430\u0442\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u043F\u043E\u0437\u0436\u0435 ${new Date(Number(issue.minimum))}`
        };
      }
      return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435" };
    case z.ZodIssueCode.too_big:
      if (issue.type === "array") {
        return {
          message: issue.exact ? `\u041C\u0430\u0441\u0441\u0438\u0432 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0440\u043E\u0432\u043D\u043E ${issue.maximum} \u044D\u043B\u0435\u043C\u0435\u043D\u0442(\u043E\u0432)` : issue.inclusive ? `\u041C\u0430\u0441\u0441\u0438\u0432 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 ${issue.maximum} \u044D\u043B\u0435\u043C\u0435\u043D\u0442(\u043E\u0432)` : `\u041C\u0430\u0441\u0441\u0438\u0432 \u0434\u043E\u043B\u0436\u0435\u043D \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043C\u0435\u043D\u0435\u0435 ${issue.maximum} \u044D\u043B\u0435\u043C\u0435\u043D\u0442(\u043E\u0432)`
        };
      }
      if (issue.type === "string") {
        return {
          message: issue.exact ? `\u0421\u0442\u0440\u043E\u043A\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u0440\u043E\u0432\u043D\u043E ${issue.maximum} \u0441\u0438\u043C\u0432\u043E\u043B(\u043E\u0432)` : issue.inclusive ? `\u0421\u0442\u0440\u043E\u043A\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 ${issue.maximum} \u0441\u0438\u043C\u0432\u043E\u043B(\u043E\u0432)` : `\u0421\u0442\u0440\u043E\u043A\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C \u043C\u0435\u043D\u0435\u0435 ${issue.maximum} \u0441\u0438\u043C\u0432\u043E\u043B(\u043E\u0432)`
        };
      }
      if (issue.type === "number") {
        return {
          message: issue.exact ? `\u0427\u0438\u0441\u043B\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0440\u0430\u0432\u043D\u043E ${issue.maximum}` : issue.inclusive ? `\u0427\u0438\u0441\u043B\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 ${issue.maximum}` : `\u0427\u0438\u0441\u043B\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043C\u0435\u043D\u044C\u0448\u0435 ${issue.maximum}`
        };
      }
      if (issue.type === "date") {
        return {
          message: issue.exact ? `\u0414\u0430\u0442\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0440\u0430\u0432\u043D\u0430 ${new Date(Number(issue.maximum))}` : issue.inclusive ? `\u0414\u0430\u0442\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u043D\u0435 \u043F\u043E\u0437\u0436\u0435 ${new Date(Number(issue.maximum))}` : `\u0414\u0430\u0442\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0440\u0430\u043D\u044C\u0448\u0435 ${new Date(Number(issue.maximum))}`
        };
      }
      return { message: "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435" };
    case z.ZodIssueCode.custom:
      return { message: issue.message || "\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435" };
    case z.ZodIssueCode.invalid_intersection_types:
      return { message: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u0435\u0440\u0435\u0441\u0435\u0447\u0435\u043D\u0438\u044F \u043D\u0435 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u043E\u0431\u044A\u0435\u0434\u0438\u043D\u0435\u043D\u044B" };
    case z.ZodIssueCode.not_multiple_of:
      return { message: `\u0427\u0438\u0441\u043B\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u043E ${issue.multipleOf}` };
    case z.ZodIssueCode.not_finite:
      return { message: "\u0427\u0438\u0441\u043B\u043E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u043E\u043D\u0435\u0447\u043D\u044B\u043C" };
    default:
      return { message: ctx.defaultError };
  }
};
var setupZodRuLocale = () => {
  z.setErrorMap(zodRuLocale);
};

// src/ZodForm.tsx
import { jsx } from "react/jsx-runtime";
function ZodForm({
  schema,
  onSubmit,
  children,
  validationMode = "onSubmit",
  defaultValues,
  resetAfterSubmit = false,
  className,
  style,
  classes,
  ...formProps
}) {
  setupZodRuLocale();
  const form = useForm({
    resolver: zodResolver(schema),
    mode: validationMode,
    defaultValues
  });
  const handleFormSubmit = async (data) => {
    try {
      await onSubmit(data);
      if (resetAfterSubmit) {
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };
  const formClassName = [
    "azb-form",
    classes?.form,
    className
  ].filter(Boolean).join(" ");
  const contentClassName = [
    "azb-form-content",
    classes?.content
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx(FormProvider, { ...form, children: /* @__PURE__ */ jsx(
    "form",
    {
      onSubmit: form.handleSubmit(handleFormSubmit),
      className: formClassName,
      style,
      ...formProps,
      children: /* @__PURE__ */ jsx("div", { className: contentClassName, children })
    }
  ) });
}

// src/BaseField.tsx
import { memo, useMemo } from "react";
import { Controller, useFormContext as useFormContext2 } from "react-hook-form";

// src/hooks/useFormField.ts
import { useFormContext, useFormState } from "react-hook-form";
var useFormField = (name) => {
  const { control } = useFormContext();
  const { errors, dirtyFields, touchedFields } = useFormState({ control });
  const error = errors[name];
  const isDirty = Boolean(dirtyFields[name]);
  const isTouched = Boolean(touchedFields[name]);
  const isValid = !error;
  return {
    field: { name },
    error,
    isDirty,
    isTouched,
    isValid
  };
};

// src/BaseField.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function BaseFieldComponent({
  name,
  label,
  required = false,
  className,
  style,
  classes,
  children
}) {
  const { control } = useFormContext2();
  const { error, isDirty, isTouched, isValid } = useFormField(name);
  const fieldState = useMemo(() => ({
    error,
    isDirty,
    isTouched,
    isValid
  }), [error, isDirty, isTouched, isValid]);
  const fieldClassName = [
    "azb-field",
    classes?.field,
    className
  ].filter(Boolean).join(" ");
  const labelClassName = [
    "azb-field-label",
    error && "azb-field-label--error",
    error && classes?.labelError,
    classes?.label
  ].filter(Boolean).join(" ");
  const errorClassName = [
    "azb-field-error",
    classes?.error
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: fieldClassName, style, children: [
    /* @__PURE__ */ jsxs("label", { className: labelClassName, children: [
      label,
      required && /* @__PURE__ */ jsx2("span", { className: `azb-field-label-required ${classes?.labelRequired || ""}`, children: "*" })
    ] }),
    /* @__PURE__ */ jsx2("div", { className: classes?.input, children: /* @__PURE__ */ jsx2(
      Controller,
      {
        name,
        control,
        render: ({ field }) => children(field, fieldState)
      }
    ) }),
    /* @__PURE__ */ jsx2("div", { className: errorClassName, children: error?.message || "" })
  ] });
}
var BaseField = memo(BaseFieldComponent);
var BaseField_default = BaseField;

// src/TextField.tsx
import { memo as memo2 } from "react";
import { Input } from "antd";
import { jsx as jsx3 } from "react/jsx-runtime";
function TextFieldComponent({
  name,
  label,
  placeholder,
  prefix,
  suffix,
  maxLength,
  showCount = false,
  size = "large",
  disabled = false,
  required = false,
  className,
  style,
  classes
}) {
  return /* @__PURE__ */ jsx3(
    BaseField,
    {
      name,
      label,
      required,
      className,
      style,
      classes,
      children: (field, { error }) => /* @__PURE__ */ jsx3(
        Input,
        {
          ...field,
          placeholder,
          prefix,
          suffix,
          maxLength,
          showCount,
          size,
          disabled,
          status: error ? "error" : void 0
        }
      )
    }
  );
}
var TextField = memo2(TextFieldComponent);

// src/PasswordField.tsx
import { Input as Input2 } from "antd";
import { jsx as jsx4 } from "react/jsx-runtime";
function PasswordField({
  name,
  label,
  placeholder,
  prefix,
  size = "large",
  disabled = false,
  required = false,
  className,
  style
}) {
  return /* @__PURE__ */ jsx4(
    BaseField_default,
    {
      name,
      label,
      required,
      className,
      style,
      children: (field, error) => /* @__PURE__ */ jsx4(
        Input2.Password,
        {
          ...field,
          placeholder,
          prefix,
          size,
          disabled,
          status: error ? "error" : "",
          visibilityToggle: true
        }
      )
    }
  );
}

// src/TextAreaField.tsx
import { Input as Input3 } from "antd";
import { jsx as jsx5 } from "react/jsx-runtime";
var { TextArea } = Input3;
function TextAreaField({
  name,
  label,
  placeholder,
  rows = 4,
  autoSize = false,
  maxLength,
  showCount = false,
  size = "large",
  disabled = false,
  required = false,
  className,
  style
}) {
  return /* @__PURE__ */ jsx5(
    BaseField_default,
    {
      name,
      label,
      required,
      className,
      style,
      children: (field, error) => /* @__PURE__ */ jsx5(
        TextArea,
        {
          ...field,
          placeholder,
          rows,
          autoSize,
          maxLength,
          showCount,
          size,
          disabled,
          status: error ? "error" : ""
        }
      )
    }
  );
}

// src/NumberField.tsx
import { InputNumber } from "antd";
import { jsx as jsx6 } from "react/jsx-runtime";
function NumberField({
  name,
  label,
  placeholder,
  prefix,
  suffix,
  min,
  max,
  step = 1,
  precision,
  formatter,
  parser,
  size = "large",
  disabled = false,
  required = false,
  className,
  style
}) {
  return /* @__PURE__ */ jsx6(
    BaseField_default,
    {
      name,
      label,
      required,
      className,
      style,
      children: (field, error) => /* @__PURE__ */ jsx6(
        InputNumber,
        {
          ...field,
          placeholder,
          prefix,
          suffix,
          min,
          max,
          step,
          precision,
          formatter,
          parser,
          size,
          disabled,
          status: error ? "error" : "",
          style: { width: "100%" }
        }
      )
    }
  );
}

// src/SelectField.tsx
import { Select } from "antd";
import { jsx as jsx7 } from "react/jsx-runtime";
function SelectField({
  name,
  label,
  placeholder,
  options,
  mode,
  allowClear = true,
  showSearch = false,
  filterOption,
  size = "large",
  disabled = false,
  required = false,
  className,
  style
}) {
  const defaultFilterOption = (input, option) => {
    return (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  };
  return /* @__PURE__ */ jsx7(
    BaseField_default,
    {
      name,
      label,
      required,
      className,
      style,
      children: (field, error) => /* @__PURE__ */ jsx7(
        Select,
        {
          ...field,
          placeholder,
          options,
          mode,
          allowClear,
          showSearch,
          filterOption: filterOption || (showSearch ? defaultFilterOption : false),
          size,
          disabled,
          status: error ? "error" : "",
          style: { width: "100%" }
        }
      )
    }
  );
}

// src/RadioField.tsx
import { Radio, Space } from "antd";
import { jsx as jsx8 } from "react/jsx-runtime";
function RadioField({
  name,
  label,
  options,
  direction = "vertical",
  size = "large",
  disabled = false,
  required = false,
  className,
  style
}) {
  return /* @__PURE__ */ jsx8(
    BaseField_default,
    {
      name,
      label,
      required,
      className,
      style,
      children: (field, error) => /* @__PURE__ */ jsx8(
        Radio.Group,
        {
          ...field,
          size,
          disabled,
          children: /* @__PURE__ */ jsx8(Space, { direction, children: options.map((option) => /* @__PURE__ */ jsx8(
            Radio,
            {
              value: option.value,
              disabled: option.disabled || disabled,
              style: {
                color: error ? "#ff4d4f" : void 0
              },
              children: option.label
            },
            option.value
          )) })
        }
      )
    }
  );
}

// src/CheckboxField.tsx
import { Checkbox } from "antd";
import { Controller as Controller2, useFormContext as useFormContext3, useFormState as useFormState2 } from "react-hook-form";
import { jsx as jsx9, jsxs as jsxs2 } from "react/jsx-runtime";
function CheckboxField({
  name,
  children,
  disabled = false,
  className,
  style
}) {
  const { control } = useFormContext3();
  const { errors } = useFormState2({ control });
  const error = errors[name];
  return /* @__PURE__ */ jsxs2("div", { className, style, children: [
    /* @__PURE__ */ jsx9(
      Controller2,
      {
        name,
        control,
        render: ({ field: { value, onChange, ...field } }) => /* @__PURE__ */ jsx9(
          Checkbox,
          {
            ...field,
            checked: value,
            onChange: (e) => onChange(e.target.checked),
            disabled,
            style: {
              color: error ? "#ff4d4f" : void 0
            },
            children
          }
        )
      }
    ),
    error && /* @__PURE__ */ jsx9("div", { style: {
      color: "#ff4d4f",
      fontSize: 14,
      marginTop: 4,
      lineHeight: 1.5
    }, children: error.message })
  ] });
}

// src/DateField.tsx
import { memo as memo3, useCallback } from "react";
import { DatePicker, ConfigProvider } from "antd";
import dayjs from "dayjs";
import locale from "antd/locale/ru_RU";
import "dayjs/locale/ru";
import { jsx as jsx10 } from "react/jsx-runtime";
dayjs.locale("ru");
function DateFieldComponent({
  name,
  label,
  placeholder,
  format = "DD.MM.YYYY",
  showTime = false,
  disabledDate,
  size = "large",
  disabled = false,
  required = false,
  className,
  style
}) {
  const handleDateChange = useCallback((date, field) => {
    field.onChange(date ? date.toDate() : null);
  }, []);
  const formatString = showTime ? `${format} HH:mm:ss` : format;
  return /* @__PURE__ */ jsx10(ConfigProvider, { locale, children: /* @__PURE__ */ jsx10(
    BaseField,
    {
      name,
      label,
      required,
      className,
      style,
      children: (field, { error }) => /* @__PURE__ */ jsx10(
        DatePicker,
        {
          ...field,
          value: field.value ? dayjs(field.value) : null,
          onChange: (date) => handleDateChange(date, field),
          placeholder,
          format: formatString,
          showTime,
          disabledDate,
          size,
          disabled,
          status: error ? "error" : void 0,
          style: { width: "100%" }
        }
      )
    }
  ) });
}
var DateField = memo3(DateFieldComponent);

// src/utils/fieldHelpers.ts
var hasError = (error) => {
  return Boolean(error?.message);
};
var getFieldStatus = (error) => {
  return hasError(error) ? "error" : void 0;
};
var formatErrorMessage = (error) => {
  return error?.message || "";
};
var isRequired = (required) => {
  return Boolean(required);
};
export {
  BaseField,
  CheckboxField,
  DateField,
  NumberField,
  PasswordField,
  RadioField,
  SelectField,
  TextAreaField,
  TextField,
  ZodForm,
  formatErrorMessage,
  getFieldStatus,
  hasError,
  isRequired,
  setupZodRuLocale,
  useFormField,
  zodRuLocale
};
