export default function Button({ btnId, btnOnClick, iElement, spanText }) {
	return (
		<button onClick={btnOnClick} className="mdc-button mdc-button--raised" id={btnId}>
			<i className="material-icons mdc-button__icon" aria-hidden="true">
				{iElement}
			</i>
			<span className="mdc-button__label">{spanText}</span>
		</button>
	)
}
