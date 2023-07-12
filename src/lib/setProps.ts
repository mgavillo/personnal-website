export default function setProp(
  ref: HTMLDivElement | HTMLButtonElement,
  prop: string,
  value: string
) {
  ref.style.setProperty("--" + prop, value);
}
