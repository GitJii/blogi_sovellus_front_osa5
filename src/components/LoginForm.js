import React from 'react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
        <div>
            <h3>Log in</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    käyttäjätunnus
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    salasana
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default LoginForm