import styles from '../../styles/Controls.module.css';

export default function Distance({ directions, setRouteIndex }) {
    // console.log(directions)
    const handleClick = e => {
        setRouteIndex(+e.currentTarget.dataset.route_index)
    }
    return (
        <div className={styles.distance}>
            <h2>Transit</h2>

            <ol>
                {
                    directions.routes.map((route, key) => {
                        const sum = summarizeRoute(route)
                        return (
                            <li
                                key={route.overview_polyline + key} onClick={handleClick}
                                data-route_index={key}
                            >
                                <span>{sum.cost}</span>
                            </li>
                        )
                    })
                }
            </ol>
        </div >
    )
}

const summarizeRoute = route => {
    // FIX: check null
    const cost = `${route.legs[0].distance.text}, ${route.fare.text}, ${route.legs[0].duration.text}`
    return {
        cost
    }
}