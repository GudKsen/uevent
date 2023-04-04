import { useState } from "react"
import "./style.scss"

export function ImageComponent({ imageUrl }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const handleShowDialog = () => {
        setIsOpen(!isOpen);
        console.log("cliked");
    };

    return (
        <div>
            <img alt=""
                className="small posterCell"
                src={imageUrl}
                onClick={handleShowDialog}
            />
            {isOpen && (
                <dialog
                    className="dialog"
                    style={{ position: "absolute" }}
                    open
                    onClick={handleShowDialog}
                >
                    <img alt="" className="image"
                        src={imageUrl}
                        onClick={handleShowDialog}
                    />
                </dialog>
            )}
        </div>
    )
}