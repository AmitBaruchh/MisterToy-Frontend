import { NavLink } from 'react-router-dom'

export function AppHeader() {
    return (
        <section className="app-header">
            <nav>
                <NavLink to="/">Home</NavLink> |<NavLink to="/toy"> Toys</NavLink>{' '}
            </nav>
            <div className="logo">Mister Toy</div>
        </section>
    )
}
