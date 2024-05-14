import React, { useEffect } from "react";
import './Blogs.scss';
import { IoMdSearch } from "react-icons/io";
import BlogCart from "../BlogCart/BlogCart";
import slika from '../../assets/blog-img.jpg';
import { useState } from 'react';
import { BlogService } from "../../services/BlogService";
import { Blog } from "../../models/Blog";


export default function Blogs(){
    const service = new BlogService();
    const [keyword, setKeyword] = useState("");
    const [order, setOrder] = useState("");
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const getData = async () => {
        let data = await service.getBlogs() ?? [];
        setBlogs(data);
    }

    const filterData = async () => {
        let data = await service.filterBlogs(keyword, order);

        setBlogs(data ?? []);
    }
    
    useEffect(() => {
        getData();
    }, []);

    return(

     
        <div className="blogs-main-content">
            <p className="blogs-first-text">Тука можете да ги пронајдете сите блогови напишани од страна на нашите корисници.
             Исто така можете да направите пребарување според клучен збор и подредување според датум на објава.</p>
            <div className="blogs-search-bar">
                <div className="blogs-search-bar-div">
                    <input type="text" placeholder="Што би сакале да читате?" 
                                       name="search" className="blogs-searchbar"
                                       onChange={(e) => setKeyword(e.target.value)}></input>
                    <button className="blogs-search-button" onClick={filterData}><IoMdSearch /></button>
                </div>
                <select className="blogs-datelist" onChange={(e) => setOrder(e.target.value)}>
                    <option value="">Датум...</option>
                    <option value="ascending">Растечки</option>
                    <option value="descending">Опаѓачки</option>
                </select>
            </div>

            <div className="blogs-blog-section">

                { blogs.length == 0 && <p>Нема записи.</p>}
                { blogs.length > 0 && blogs.map( (item, idx) => {
                    return <BlogCart
                            key={idx}
                            id={item.id ?? ""} 
                            slika={slika}
                            naslov={item.title ?? ""}
                            avtor={item.user?.userName ?? ""}
                            datum={new Date(item.dateCreated)}
                            summary={item.contentBody?.substring(0, 100) + "..."}
                            />
                })}
            </div>
        </div>
    )
}