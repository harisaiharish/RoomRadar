const rankingComparator = (marker1, marker2) => {
    if (marker1.time / marker2.time <= Math.log(marker1.quality) / Math.log(marker2.quality)
        || marker1.time - marker2.time <= 6 * (marker1.quality - marker2.quality)) {
        return -1;
    } else {
        return 1;
    }
}
