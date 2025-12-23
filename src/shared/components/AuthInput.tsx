interface AuthInputProp{
    type : string;
    label : string;
    name : string;
    value : string;
    inputHandling : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({ type, label, name, value, inputHandling } : AuthInputProp){
    return(
        <div className="mb-4">
            <label htmlFor={name} className="form-label fw-bold">{label}</label>
            <input type={type} id={name} className="form-control" name={name} value={value} onChange={inputHandling} required/>
        </div>
    )
}