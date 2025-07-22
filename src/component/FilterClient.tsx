import { useEffect, useRef, useState } from 'react';
import './../styles/global.css';

type Post = {
  slug: string;
  title: string;
  category: string[];
  summary: string;
  path: string;
  image: string;
};

interface FilterClientProps {
  posts: Post[];
}

export default function FilterClient({ posts }: FilterClientProps) {
  const [filter, setFilter] = useState<string>('');
  const [visible, setVisible] = useState<number[]>([]);

  const filtered = filter
    ? posts.filter((post) => post.category.includes(filter))
    : posts;

  const categories = Array.from(new Set(posts.flatMap((p) => p.category))) as string[];

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
      useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-idx'));
          if (entry.isIntersecting) {
            setVisible((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, [filtered]);
    
  return (
    <div>
      <div className='button-group'>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
        <button
          onClick={() => setFilter('')}
          className={filter === '' ? 'active' : ''}
        >
          Alle
        </button>
      </div>

      <div className="grid">
    {
      filtered.map((post, idx) => (
        <a href={post.path} className="card-link">
        {/* <div className="card" data-categories={post.category.join(',')}> */}
            <div
              className={`card${visible.includes(idx) ? ' visible' : ''}`}
              data-categories={post.category.join(',')}
              data-idx={idx}
              ref={el => { cardRefs.current[idx] = el; }}
            >
            <h3>{post.title}</h3>
          <hr />
          <img src={post.image} alt={post.title} />
          <p>{post.summary}</p>
          <hr />

          <div className="category">
            {post.category.map((cat: string) => (
              <div className="cat" key={cat}>{cat}</div>
            ))}
          </div>
        </div>
        </a>
      ))
    }
  </div>
    </div>
  );
}
