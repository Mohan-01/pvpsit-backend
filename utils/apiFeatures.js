class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    /*
    filter() {
        const queryObj = {...this.queryString};
        const excludeFields = ['page', 'sort', 'limit'];

        // excludeFields.forEach(field => queryObj.delete(queryObj[field]));
        excludeFields.forEach(field => delete queryObj[field]);
        return this;
    }
    */

    sort() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    limitFields() {
        this.query = this.query.select('-__v');
        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

export default APIFeatures;