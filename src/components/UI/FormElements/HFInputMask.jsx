import React, { useEffect } from "react";
import InputMask from "react-input-mask";
import { Controller } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";

export default function HFInputMask({
  control,
  register,
  clasess,
  required = false,
  classesInput,
  translation = "common",
  name,
  extra,
  errors = {},
  defaultValue = "",
  inputmode = "text",
  setValue = () => {},
  handleChange = () => {},
  ...props
}) {
  const { t } = useTranslation(translation);

  useEffect(() => {
    if (defaultValue) setValue(name, defaultValue);
  }, [defaultValue, setValue, name]);

  return (
    <div className={`w-full ${clasess} relative`}>
      {props.label && (
        <p className="text-blackLight text-[14px] font-[700] mb-[6px]">
          {required ? <span className="text-error pr-1">*</span> : ""}
          {t(props.label, `${translation}:${props.label}`)}
        </p>
      )}
      <Controller
        control={control}
        name={name}
        rules={{
          required: required,
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <InputMask
            onChange={(e) => {
              handleChange(e);
              onChange(e);
            }}
            inputMode={inputmode}
            mask={props.mask}
            error={error}
            placeholder={t(
              props.placeholder,
              `${translation}:${props.placeholder}`
            )}
            value={value}
            className={`w-full h-[42px] px-4 outline-none text-dark text-sm font-medium rounded-[12px] ${
              defaultValue
                ? "placeholder:text-dark"
                : "placeholder:text-grayLight"
            } ${errors[name] ? "border border-[#111]" : ""} ${classesInput}`}
            maskChar={props.maskChar}
            style={{ borderColor: error ? "#111" : "" }}
            {...props}
          ></InputMask>
        )}
      />
      {errors[name]?.message && (
        <p className="text-sm text-[#111] absolute">
          {t(errors[name]?.message)}
        </p>
      )}

      {extra}
    </div>
  );
}
