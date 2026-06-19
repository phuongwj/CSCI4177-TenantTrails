import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";
import { stars } from "../data/mockData";
import TopNav from "../components/TopNav";

export default function Dashboard() {
  const navigate = useNavigate();
  const { apartments, reviews, getAptRating, getAptReviewCount } = useData();
  const [search, setSearch] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("all");
  const [sort, setSort] = useState("rating-desc");

  const hoods = [...new Set(apartments.map(a => a.neighbourhood))];

  const apts = useMemo(() => {
    let list = [...apartments];
    if (search) list = list.filter(a => (a.address + ' ' + a.name + ' ' + a.neighbourhood).toLowerCase().includes(search.toLowerCase()));
    if (neighbourhood !== 'all') list = list.filter(a => a.neighbourhood === neighbourhood);
    list = list.map(a => ({ ...a, rating: getAptRating(a.id), count: getAptReviewCount(a.id) }));
    if (sort === 'rating-desc') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'rating-asc') list.sort((a, b) => a.rating - b.rating);
    else if (sort === 'reviews-desc') list.sort((a, b) => b.count - a.count);
    else if (sort === 'newest') list.sort((a, b) => b.id - a.id);
    return list;
  }, [apartments, reviews, search, neighbourhood, sort]);

  return (
    <div className="view active">
      <div className="app-shell">
        <TopNav search={search} setSearch={setSearch} />
        <div className="content-area">
          <div className="view active">
            <div className="dash-header">
              <h1>Apartments in Halifax</h1>
              <p>Honest reviews from real tenants. Read before you rent.</p>
            </div>
            <div className="dash-stats">
              <div className="stat-chip"><strong>{apartments.length}</strong>&nbsp;apartments</div>
              <div className="stat-chip"><strong>{reviews.length}</strong>&nbsp;reviews</div>
              <div className="stat-chip"><strong>{hoods.length}</strong>&nbsp;neighbourhoods</div>
            </div>
            <div className="dash-filters">
              <select className="filter-select" value={neighbourhood} onChange={e => setNeighbourhood(e.target.value)}>
                <option value="all">All Neighbourhoods</option>
                <option value="South End">South End</option>
                <option value="Downtown">Downtown</option>
                <option value="West End">West End</option>
                <option value="Spring Garden">Spring Garden</option>
                <option value="North End">North End</option>
              </select>
              <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="rating-desc">Highest Rated</option>
                <option value="rating-asc">Lowest Rated</option>
                <option value="reviews-desc">Most Reviews</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="apt-grid">
              {apts.length === 0 ? (
                <div className="no-results"><h3>No apartments found</h3><p>Try a different search or filter.</p></div>
              ) : (
                apts.map(a => {
                  const issues = a.aiIssues || [];
                  return (
                    <div className="apt-card" key={a.id} onClick={() => navigate(`/apartment/${a.id}`)}>
                      <div className="apt-thumb" style={{ backgroundImage: `url('${a.img}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
                        <div className="rating-badge"><span className="star">★</span> {a.rating.toFixed(1)}</div>
                      </div>
                      <div className="apt-body">
                        <h3>{a.name}</h3>
                        <div className="neighbourhood">📍 {a.address} · {a.neighbourhood}</div>
                        <div className="apt-tags">
                          {issues.slice(0, 3).map((i, idx) => <span className="tag" key={idx}>{i}</span>)}
                          {!issues.length && <span className="tag">No AI summary yet</span>}
                        </div>
                        <div className="apt-foot">
                          <span><strong>{a.count}</strong> reviews</span>
                          <span>{stars(a.rating)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
