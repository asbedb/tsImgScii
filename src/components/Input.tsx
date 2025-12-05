import { type ChangeEvent } from 'react'

type inputType = React.InputHTMLAttributes<HTMLInputElement>
type eventChangeType = ChangeEvent<HTMLInputElement>

interface InputProps {
    type: inputType['type']
    label: string
    accept?: inputType['accept']
    isTextInput?: boolean
    customPlaceholder?: string
    onChange?: (event: eventChangeType) => void
    onBlur?: (event: eventChangeType) => void
    isChecked?: boolean
    value?: inputType['value']
    responsive?: boolean
}

export function Input({
    type,
    label,
    accept,
    onBlur,
    onChange,
    isTextInput,
    isChecked,
    customPlaceholder,
    value,
    responsive,
}: InputProps) {
    if (!type) return
    return (
        <div
            className={`flex h-fit w-full justify-between ${responsive ? 'flex-col md:flex-row' : ''}`}
        >
            <span className="flex w-full">{label}</span>
            <input
                type={type}
                accept={accept}
                onChange={onChange}
                onBlur={onBlur}
                checked={isChecked}
                value={value}
                className={`${
                    isTextInput
                        ? 'bg-gray-800'
                        : 'bg-purpy-500 hover:bg-purpy-200 rounded-xl hover:cursor-pointer'
                } flex w-full truncate p-2 font-bold ${type == 'checkbox' ? '' : 'flex'}`}
                placeholder={customPlaceholder ? customPlaceholder : label}
            />
        </div>
    )
}
