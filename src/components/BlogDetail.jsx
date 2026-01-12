import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiUser, FiCalendar, FiClock, FiEye, FiBookmark, FiShare2, FiExternalLink } from "react-icons/fi";
import "./Blog.css";

import { generateBlogPosts } from "./Blog";

const BlogDetail = () => {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const blogPosts = generateBlogPosts();
  
  // Find blog by slug or id
  const blog = slug 
    ? blogPosts.find(post => post.slug === slug)
    : blogPosts[id];

  if (!blog) {
    return (
      <div className="blog-detail-error">
        <h2>Blog not found</h2>
        <button onClick={() => navigate('/blog')} className="back-to-blog-btn">
          ← Back to All Insights
        </button>
      </div>
    );
  }

  // Generate random views for demonstration
  const views = Math.floor(Math.random() * 2000) + 500;

  return (
    <div className="blog-detail-page">
      {/* Breadcrumb Navigation */}
      <motion.div 
        className="breadcrumb"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button onClick={() => navigate('/blog')} className="breadcrumb-link">
          <FiArrowLeft /> All Insights
        </button>
        <span className="breadcrumb-divider">/</span>
        <span className="breadcrumb-current">{blog.category}</span>
      </motion.div>

      {/* Header Section */}
      <motion.div 
        className="blog-detail-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {/* Category and Tag */}
        <div className="blog-detail-tags">
          <span className="category-badge" style={{ background: blog.badgeColor }}>
            {blog.category.toUpperCase()}
          </span>
          <span className={`access-tag ${blog.tag.toLowerCase()}`}>
            {blog.tag}
          </span>
        </div>

        {/* Title */}
        <h1 className="blog-detail-title">{blog.title}</h1>

        {/* Excerpt */}
        <p className="blog-detail-excerpt">{blog.excerpt}</p>

        {/* Metadata Cards */}
        <div className="blog-metadata">
          <div className="metadata-card">
            <FiUser className="metadata-icon" />
            <div className="metadata-content">
              <span className="metadata-label">AUTHOR</span>
              <span className="metadata-value">Thomas Wright</span>
            </div>
          </div>

          <div className="metadata-card">
            <FiCalendar className="metadata-icon" />
            <div className="metadata-content">
              <span className="metadata-label">PUBLISHED</span>
              <span className="metadata-value">{blog.date}</span>
            </div>
          </div>

          <div className="metadata-card">
            <FiClock className="metadata-icon" />
            <div className="metadata-content">
              <span className="metadata-label">READ TIME</span>
              <span className="metadata-value">{blog.readTime}</span>
            </div>
          </div>

          <div className="metadata-card">
            <FiEye className="metadata-icon" />
            <div className="metadata-content">
              <span className="metadata-label">VIEWS</span>
              <span className="metadata-value">{views.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="blog-stats">
          <div className="stat-card">
            <div className="stat-value">12</div>
            <div className="stat-label">CHARTS</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">8</div>
            <div className="stat-label">METRICS</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">95%</div>
            <div className="stat-label">ACCURACY</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">A+</div>
            <div className="stat-label">GRADE</div>
          </div>
        </div>
      </motion.div>

      {/* Content Section with Sidebar */}
      <div className="blog-detail-content-wrapper">
        {/* Sidebar - Table of Contents */}
        <motion.aside 
          className="blog-detail-sidebar"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="sidebar-sticky">
            <h3 className="sidebar-title">Contents</h3>
            <ul className="blog-toc">
              {blog.content.toc.map((item, index) => (
                <li key={index} className="toc-item">
                  <span className="toc-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="toc-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>

        {/* Main Content */}
        <motion.article 
          className="blog-detail-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {blog.content.sections.map((section, index) => (
            <div key={index} className="content-section">
              <h2 className="section-heading">{section.heading}</h2>
              <p className="section-text">{section.text}</p>
            </div>
          ))}

          {/* Back to Blog Button */}
          <div className="blog-detail-footer">
            <button onClick={() => navigate('/blog')} className="back-to-blog-btn">
              <FiArrowLeft /> Back to All Insights
            </button>
          </div>
        </motion.article>

        {/* Floating Action Buttons */}
        <div className="floating-actions">
          <motion.button 
            className="action-btn bookmark-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Bookmark"
          >
            <FiBookmark />
          </motion.button>
          <motion.button 
            className="action-btn share-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Share"
          >
            <FiShare2 />
          </motion.button>
          <motion.button 
            className="action-btn external-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Open in new tab"
          >
            <FiExternalLink />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
