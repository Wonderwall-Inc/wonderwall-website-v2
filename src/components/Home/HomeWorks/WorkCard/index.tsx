import Link from "next/link";
import Image from "next/image";

type WorkCard = {
  id: string,
  title: string,
  link?: string,
  items?: string[],
  class?: string[],
  image?: string,
}

export default function WorkCard(props: WorkCard) {
  let classList: string[] = ["work-card-item", props.id];
  if (props.class) classList = classList.concat(props.class);

  const getTagContent = () => {
    return (
      <div className="relative z-20">
        <h2 className="text-xl md:text-2xl">{props.title}</h2>
        {props.items
          ? <ul className="work-card-ul flex items-center justify-center text-xs lg:items-start lg:justify-start">
            {props.items.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
          : ''
        }
      </div>
    )
  }

  const getImage = () => {
    if (!props.image) return '';
    return (
      <Image
        src={props.image}
        className="absolute z-10"
        fill
        loading="lazy"
        alt={""}
      />
    )
  }

  if (props.link) {
    return (
      <Link
        className={classList.join(' ')}
        href={props.link}
      >
        {getTagContent()}
        {getImage()}
      </Link>
    )
  }

  return (
    <div className={classList.join(' ')}>
      {getTagContent()}
      {getImage()}
    </div>
  )
}