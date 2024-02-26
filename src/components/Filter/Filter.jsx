import "./xtra.css"
import { useState, useEffect } from "react"
import { FilterDom } from "./filter.ts"


export const Filter = () => {
    const [filter, setFilter] = useState("X")

    const handleFilter = (e) => {
        const currentFilterValue = e.target.value
        setFilter(currentFilterValue)
        FilterDom(currentFilterValue)
        localStorage.setItem("filter", currentFilterValue)
    }

    useEffect(() => {
      const storedFilter = localStorage.getItem("filter");
      if (storedFilter) {
        setFilter(storedFilter);
        FilterDom(storedFilter);
      }
    }, []);

    return (
      <div className="flex f-wrap gap-sm middle">
      <p>Filtrar :</p>
    
      <label >
        <input id="forDevs" type="radio" name="radio" checked={filter === 'Para devs'} value='Para devs' onChange={handleFilter} />
        <span className="chip br-primary transparent" id="label-dev">Para devs</span>
      </label>
      <label >
        <input id="forEveryone" type="radio" name="radio" checked={filter === 'Para todos'}  value='Para todos' onChange={handleFilter} />
        <span id="label-everyone" className="chip br-green transparent">No Devs</span>
      </label>
      <label >
        <input id="all" type="radio" name="radio" checked={filter === 'X'}  defaultChecked={true} value='X' onChange={handleFilter} />
        <span id="label-all" className="chip br-accent transparent">Todos</span>
      </label>
    </div>
    )
}

