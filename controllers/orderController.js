export const getPage2Data = async (req, res) => {
    try {
        res.status(200).json({ message: 'Page 2 data retrieved successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
