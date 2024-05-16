import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../../store/modules/categories/actions/categoriesAction'
import './Categories.css'

const Categories = () => {

      const dispatch = useDispatch()

      const currentState = useSelector((state) => state);

      const categories = currentState.CategoriesState.categoryItems

      const getCategories = () => dispatch(fetchCategories())

      useEffect(() => {
        getCategories();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      return (
        <div className="categories">
          <h2 className="categories-title">Категорії тем:</h2>
          <ul className="categories-list">
            {categories.map(category => (
              <Link to={'/category/posts/' + category.id} key={category.id}>
                <li key={category.id} className="categories-item">
                    <h3 className="categories-item-title">{category.name}</h3>
                    <p className="categories-item-description">{category.description}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      );
}

export default Categories