import styles from '../../styles/Controls.module.css'

export default function NeighborhoodInfo({ neighborhoodData }) {
    // console.log(neighborhood)
    return (
        <div className={styles.neighborhood}>
            <h2 className={styles.title}>Neighborhood</h2>

            <p>{neighborhoodData && neighborhoodData.name}</p>
        </div>
    )
}