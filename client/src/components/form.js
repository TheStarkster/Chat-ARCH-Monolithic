import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

class Cform extends Component {
    constructor(props){
        super(props)
        this.state = {
            ul: [],
            receiver: "",
            sender: "",
        }
        const io = socketIOClient('http://localhost:2000')
        io.on("new_message",(data)=> {
            console.log(data)
        })
        io.on("User_Connected", (username) => {
            this.setState({
                ul: this.state.ul.concat(
                    <li>
                        <button onClick={() => this.onUserSelected(username)}>{ username }</button>
                    </li>
                )
            })
        })
        this.onUserSelected = (username) => {
            this.setState({
                receiver: username
            })
        }
        this.NameHandler = () => {
            var name = document.getElementById('user_name').value
            io.emit("User_Connected", name)
            this.setState({
                sender: name
            })
        }
        this.SendMessage = (event) => {
            event.preventDefault()
            var message = document.getElementById('message').value
            io.emit("send_message",{
                sender: this.state.sender,
                receiver: this.state.receiver,
                message: message
            })
        }
    }
    render() {
        return (
            <div>
                <input type="text" id="user_name"></input>
                <button onClick={() => this.NameHandler()}>Enter</button>
                <ul>
                    {this.state.ul}
                </ul>
                <form onSubmit={this.SendMessage}>
                    <input id="message" placeholder="Enter Your Message"></input>
                    <input type="submit"></input>
                </form>
            </div>
        )
    }
}

export default Cform