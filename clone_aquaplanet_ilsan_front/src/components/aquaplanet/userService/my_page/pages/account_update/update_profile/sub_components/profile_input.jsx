const ProfileInput = ({
    label,
    name,
    value,
    onChange,
    required,
    placeholder
}) => {

    return (
        <div className="modify-form-content">
            <label htmlFor={name}>{label}</label>
            <input
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
            />
        </div>
    )
}
export default ProfileInput;