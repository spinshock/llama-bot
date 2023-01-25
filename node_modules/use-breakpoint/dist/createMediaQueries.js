/**
 * Create media query objects
 * @param breakpoints the list of configured breakpoint names and their pixel values
 */
const createMediaQueries = (breakpoints) => {
    const sortedBreakpoints = Object.keys(breakpoints).sort((a, b) => breakpoints[b] - breakpoints[a]);
    return sortedBreakpoints.map((breakpoint, index) => {
        let query = '';
        const minWidth = breakpoints[breakpoint];
        const nextBreakpoint = sortedBreakpoints[index - 1];
        const maxWidth = nextBreakpoint ? breakpoints[nextBreakpoint] : null;
        if (minWidth >= 0) {
            query = `(min-width: ${minWidth}px)`;
        }
        if (maxWidth !== null) {
            if (query) {
                query += ' and ';
            }
            query += `(max-width: ${maxWidth - 1}px)`;
        }
        const mediaQuery = {
            breakpoint,
            maxWidth: maxWidth ? maxWidth - 1 : null,
            minWidth,
            query,
        };
        return mediaQuery;
    });
};
export default createMediaQueries;
