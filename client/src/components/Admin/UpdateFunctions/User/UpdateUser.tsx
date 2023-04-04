import axios from "axios";

export function UpdatePhoto({id, photo}: any)
{
    axios.patch(`http://localhost:8000/api/user/${id}`, {
        profile_photo: photo
    });
}

export function UpdateFullName({id, full_name}: any)
{
    axios.patch(`http://localhost:8000/api/user/${id}`, {
        full_name: full_name
    });
}

export function UpdateRole({id, role}: any)
{
    axios.patch(`http://localhost:8000/api/user/${id}`, {
        role: role
    });
}

export function UpdateEmail({id, email}: any)
{
    axios.patch(`http://localhost:8000/api/user/${id}`, {
        email: email
    });
}

export function UpdatePhoneNumber({id, phone_number}: any)
{
    axios.patch(`http://localhost:8000/api/user/${id}`, {
        phone_number: phone_number
    });
}

export function UpdateBirthday({id, birth_date}: any)
{
    axios.patch(`http://localhost:8000/api/user/${id}`, {
        birthday: birth_date
    });
}

export function UpdateCountry({id, country}: any)
{
    axios.patch(`http://localhost:8000/api/user/${id}`, {
        country: country
    });
}

export function UpdateCity({id, city}: any)
{
    axios.patch(`http://localhost:8000/api/user/${id}`, {
        city: city
    });
}