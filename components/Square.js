import { SQUARE_X, SQUARE_O } from "./utils/game";


const Square = ({ value, onClick }) => {

    switch (value) {
        case SQUARE_X:
            return <div className="square-content">X</div>
        case SQUARE_O:
            return <div className="square-content">O</div>
        default:
            return <div className="square-content cursor-pointer w-full h-full" onClick={onClick}></div>
    }
}

export default Square;