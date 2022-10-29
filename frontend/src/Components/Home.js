import axios from 'axios';

export default function Home() {

    const click = () => {
        axios.get("http://localhost:9000/user")
  .then(response => {
    console.log(response.data);
  })
    }


    return (
        <main>
            <h1>Foodle</h1>
            <button onClick={click}>CLICK</button>
        </main>
    );
}