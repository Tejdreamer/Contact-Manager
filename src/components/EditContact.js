import React from 'react';
import { withRouter } from 'react-router-dom';

class EditContact extends React.Component {
  constructor(props){
    super(props)
    const {id,name,email} = props.location.state.contact

    this.state={
      id,
      name,
      email,
    };
  }
    update = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.email === '') {
            alert('All the fields are mandatory!!');
            return;
        }
        this.props.updateContactHandler(this.state);
        this.setState({ name: '', email: '' });
        this.props.history.push('/'); // Use history to navigate
    };

    render() {
        console.log(this.props); // Check the props for history, location, and match

        return (
            <div className="ui main">
                <h2>Edit Contact</h2>
                <form className="ui form" onSubmit={this.update}>
                    <div className="field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                    </div>
                    <button className="ui button blue">Update</button>
                </form>
            </div>
        );
    }
}

export default withRouter(EditContact);