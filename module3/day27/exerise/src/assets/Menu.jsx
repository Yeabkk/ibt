
import Dish from './Dish'
function Menu({ dishes, category }) {
const shown = dishes.filter(d => d.category === category);
if (shown.length === 0) return <p>No {category} dishes selected.</p>;
return shown.map(d => <Dish key={d.id} {...d} />);
}


export default Menu