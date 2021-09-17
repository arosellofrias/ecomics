import {Link} from 'react-router-dom'

const Error = () => {
    return(
        <div>
            <h1>oops..</h1>
            <img src="https://media2.giphy.com/media/9J7tdYltWyXIY/giphy.gif?cid=ecf05e47etw1kerejn9yvx3jgwxxjp129cecpgn9y9xdzsa7&rid=giphy.gif&ct=g" alt="error" />
            <Link to={"/comics"} ><h1>Volver al Home</h1></Link>
        </div>
    )
}

export default Error