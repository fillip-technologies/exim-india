export const DEFAULT_PHONE_CODE = '+91'
export const PHONE_DIGITS = 10

/** "+91" + "9876543210" → "+91 9876543210" (undefined when no number was typed) */
export const formatPhone = (code, number) =>
  number ? `${(code || DEFAULT_PHONE_CODE).trim()} ${number}` : undefined

/**
 * Phone field: editable country code (defaults to +91) and a national number
 * that accepts digits only and must be exactly 10 digits.
 * Empty is allowed unless `required` is set.
 */
export default function PhoneInput({
  id,
  code,
  number,
  onChange,
  required = false,
  disabled = false,
  className = '',
  codeClassName = '',
}) {
  const handleCode = (e) => {
    // "+" followed by up to 4 digits
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4)
    onChange('+' + digits, number)
  }

  const handleNumber = (e) => {
    onChange(code, e.target.value.replace(/\D/g, '').slice(0, PHONE_DIGITS))
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        inputMode="tel"
        aria-label="Country code"
        value={code}
        onChange={handleCode}
        onBlur={() => !/^\+\d{1,4}$/.test(code) && onChange(DEFAULT_PHONE_CODE, number)}
        disabled={disabled}
        required={required}
        pattern="\+\d{1,4}"
        title="Country code, e.g. +91"
        className={`w-20 shrink-0 text-center ${className} ${codeClassName}`}
      />
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        value={number}
        onChange={handleNumber}
        disabled={disabled}
        required={required}
        pattern={`\\d{${PHONE_DIGITS}}`}
        minLength={PHONE_DIGITS}
        maxLength={PHONE_DIGITS}
        title="Enter exactly 10 digits"
        placeholder="10-digit number"
        className={`min-w-0 flex-1 ${className}`}
      />
    </div>
  )
}
