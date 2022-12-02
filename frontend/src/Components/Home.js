import axios from 'axios';


export default function Home() {



    const click = () => {
        axios.get("/user")
  .then(response => {
    
    console.log(response.data);
  })
    }

    const click2 = () => {
        const data = {
            username: 'alphano',
            name: 'Flintstone',
            password: '123'
        }
        axios.post('/user', {body:JSON.stringify(data)})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const a = () => {
        //sessionStorage.setItem("username", "rav");

        console.log(sessionStorage.getItem('username'))
    }


    return (
        <main>
            <h1>Foodle</h1>
            <p>{sessionStorage.getItem('username')}</p>
        </main>
    );
}