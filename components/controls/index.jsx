import SearchBox from './searchBox';
import NeighborhoodInfo from './neighborhoodInfo';
import Distance from './distance';

import styles from '../../styles/Controls.module.css';

export default function Controls({ directions, setOriginPosition, neighborhoodData, setRouteIndex }) {
    return (
        <div className={styles["search-container"]}>
            <h1>Commute</h1>
            <SearchBox
                setOriginPosition={setOriginPosition}
            />

            <NeighborhoodInfo neighborhoodData={neighborhoodData} />

            {directions && <Distance
                directions={directions}
                setRouteIndex={setRouteIndex}
            />}

            {/* <button className={styles.compute}>Compute Distance</button> */}
        </div>
    )
}