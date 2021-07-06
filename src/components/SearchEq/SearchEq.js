import EquationEditor from "equation-editor-react";
import React, { useEffect, useState } from "react";
import { StaticMathField } from "react-mathquill";
import { Link } from "react-router-dom";
import { searchEq2 } from "../../api";
import "./SearchEq.css";

const links = [
    {
        name: "Google",
        url: "//www.google.com/search?q=",
    },
    {
        name: "Quora",
        url: "//www.quora.com/search?q=",
    },
    
];

const SearchEq = () => {
    const [query, setQuery] = useState();
    const [equation, setEquation] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [raw, setRaw] = useState(false);

    useEffect(() => {
        const q = equation.split("\\ ").join(" ");
        setQuery(q);
    }, [equation]);


    const handleSearch = async () => {
        const { data } = await searchEq2({text: `https://www.google.com/search?q=${query}`});
        console.log(data)
        setSearchResult(data);
    }

    return (
        <div className="">
            <div className="eq-search">
                <div className="eq-input">
                    <EquationEditor
                        value={equation}
                        onChange={setEquation}
                        autoCommands="pi theta sqrt sum prod alpha beta gamma rho vec bar"
                        autoOperatorNames="sin cos"
                    />
                </div>
                <div className="btns">
                    <button className="btn-danger" onClick={handleSearch} disabled={!query}>
                        Search!
                    </button>

                    {links.map((link) =>
                        query ? (
                            <Link
                                to={`${link.url}${encodeURIComponent(query)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <button className="btn-dark">Search {link.name}</button>
                            </Link>
                        ) : (
                            <button className="btn-dark" disabled>
                                Search {link.name}
                            </button>
                        )
                    )}
                </div>
            </div>

            {searchResult.length && (
                <div className="eq-search-result text-center">
                    <span className="btn btn-secondary" onClick={() => setRaw(!raw)}>
                        {raw ? "View parsed (Beta)" : "View Raw"}
                    </span>
                    {searchResult.map((data, i) => (
                        <>
                            {!/http/.test(data.url) || /.google.com/.test(data.url) ? (
                                <span></span>
                            ) : (
                                data.title && (
                                    <a
                                        href={data.url.split("&")[0].slice(7)}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <button className="btn btn-dark">
                                            {raw ? (
                                                data.title
                                            ) : (
                                                <StaticMathField>
                                                    {data.title.split(" ").join("\\ ")}
                                                </StaticMathField>
                                            )}
                                        </button>
                                    </a>
                                )
                            )}
                        </>
                    ))}
                </div>
            )}
            {/* {searchResult && (
                <iframe
                    className="search-result-frame"
                    style={{
                        height: "68vh",
                        width: "100%",
                        borderRadius: "10px",
                        marginTop: "5px",
                    }}
                    is="x-frame-bypass"
                    src={`https://www.google.com/search?q=${query}`}
                    title="google"
                ></iframe>
            )} */}
        </div>
    );
};

export default SearchEq;
