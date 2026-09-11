
import './App.css'
import Dish from './assets/Dish'
import Header from './assets/Header'
import Menu from './assets/Menu'

function App() {
    const dish =[
      { id: 1, name: "Injera", price: 50, spicy: false },
      { id: 2, name: "Doro Wat", price: 80, spicy: true },
      { id: 3, name: "Beso", price: 60, spicy: false },
      { id: 4, name: "Kitfo", price: 100, spicy: true },
      { id: 5, name: "Shiro", price: 70, spicy: false },
      { id: 6, name: "Tibs", price: 90, spicy: true },
      { id: 7, name: "Gored Gored", price: 110, spicy: true },
      { id: 8, name: "Firfir", price: 75, spicy: false },
    ]

  return (
    <>
    <Header />
      {dish.map((item) => (
        <Dish key={item.id} name={item.name} price={item.price} spicy={item.spicy} currency="ETB" />
      ))}
      <>-------------------------------- </>
      <Menu dishes={dish} category="spicy" />
    </>
  )
}

export default App
