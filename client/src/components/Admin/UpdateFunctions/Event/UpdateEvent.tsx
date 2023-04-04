import axios from "axios";

export function UpdateEvent({id, title, description, author, location, dateTime, poster, price}: any)
{
    axios.patch(`http://localhost:8000/api/event/${id}`, {
        title: title,
        description: description,
        author: author,
        location: location,
        dateTime: dateTime,
        poster: poster,
        price: price
    })
}

export function UpdateTitle({ id, newUnitPrice }: any)
{
    axios.patch(`http://localhost:8000/api/event/${id}`, {
            title: newUnitPrice
    })
}

export function UpdateDescription()
{
    
}



