import Nav from './Nav';

const Header = () => (
    <div>
        <div className="bar">
            <a href="">Spend Bloombergs Money</a>
        </div>
        <Nav />
        <div className="sub-bar">
            <p>Search</p>
        </div>
        <div>Cart</div>
    </div>
);

export default Header;
