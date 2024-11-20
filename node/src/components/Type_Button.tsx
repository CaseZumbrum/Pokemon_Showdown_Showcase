interface props {
    type_name: string,
    handle_types: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
}

function Type_button({ type_name, handle_types }: props) {
    return (
        <div>
            {type_name}: <input type="checkbox" name={type_name} onClick={handle_types}></input>
        </div>
    )
}

export default Type_button