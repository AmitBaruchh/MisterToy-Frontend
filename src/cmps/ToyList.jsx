import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, onRemoveToy }) {
    return (
        <section className="toy-list">
            <ul>
                {toys.map(toy => (
                    <li key={toy._id}>
                        <ToyPreview toy={toy} />
                        <div className="btn-container">
                            <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
