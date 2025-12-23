import "../styles/divider.css";

export default function Divider(prop: {text:string}){
    return(
        <div className="divider">{prop.text}</div>
    )
}