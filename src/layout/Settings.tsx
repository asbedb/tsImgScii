interface SettingsProps {
    children: React.ReactNode
    settingsVisible: boolean
}

export function Settings({ children, settingsVisible }: SettingsProps) {
    return (
        <div
            className={`flex h-full w-full flex-col ${settingsVisible ? '' : 'hidden'} mb-12 overflow-y-scroll bg-gray-950 p-4 text-white`}
        >
            {children}
        </div>
    )
}
