const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const max = (prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(max, 0)
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    // Even for a single blog, we'll return the same format
    if (blogs.length === 1) {
        return { author: blogs[0].author, blogs: 1 };
    }

    const groupedBlogs = blogs.reduce((prev, curr) => {
        prev[curr.author] = prev[curr.author] || [];
        prev[curr.author].push(curr);
        return prev;
    }, {});

    return Object.entries(groupedBlogs)
        .reduce((max, [author, posts]) =>
            posts.length > max.blogs
                ? { author, blogs: posts.length }
                : max,
            { author: '', blogs: 0 }
        );
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    // Even for a single blog, we'll return the same format
    if (blogs.length === 1) {
        return { author: blogs[0].author, likes: blogs[0].likes };
    }

    const groupedBlogs = blogs.reduce((prev, curr) => {
        prev[curr.author] = prev[curr.author] || [];
        prev[curr.author].push(curr);
        return prev;
    }, {});

    const sum = (sum, item) => {
        return sum + item.likes
    }
    
    return Object.entries(groupedBlogs)
        .reduce((max, [author, posts]) =>
            posts.reduce(sum, 0) > max.likes
                ? { author, likes: posts.reduce(sum, 0) }
                : max,
            { author: '', likes: 0 }
        );
};

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}