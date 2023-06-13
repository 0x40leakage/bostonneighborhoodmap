import usePlacesAutocomplete, {
    getGeocode,
    getLatLng
} from "use-places-autocomplete"
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox"

import "@reach/combobox/styles.css"

import styles from '../../styles/Controls.module.css';

export default function Places({ setOriginPosition }) {
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

    const handleSelect = async address => {
        setValue(address, false)
        clearSuggestions()

        const results = await getGeocode({ address })
        const { lat, lng } = await getLatLng(results[0])
        setOriginPosition({ lat, lng, address })
    }

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput value={value} onChange={e => setValue(e.target.value)} disabled={!ready} placeholder="Search" className={styles["combobox-input"]} />

            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && data.map(({ place_id, description }) => <ComboboxOption key={place_id} value={description} />)}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    )
}

// npm i @reach/combobox --legacy-peer-deps
// npm i use-places-autocomplete --legacy-peer-deps