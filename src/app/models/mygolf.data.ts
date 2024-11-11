/* tslint:disable */
// Generated using typescript-generator version 2.9.456 on 2020-05-20 13:55:50.
// updated on 2022-12-16 11:12
// import * as global from "../globals";
import * as util from "../util";
import * as moment from 'moment';
export interface AddressData {
    id?: number;
    address1?: string;
    address2?: string;
    city?: string;
    postCode?: string;
    state?: string;
    countryData?: CountryData;
    phone1?: string;
    phone2?: string;
    phoneNumbers?: PhoneNumbers;
    fax?: string;
    webSite?: string;
    addressHTML?: string;
    email?: string;
}

export interface AddressInfo {
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    countryId?: string;
    countryName?: string;
    postCode?: string;
    email?: string;
    phone1?: string;
    phone2?: string;
    fax?: string;
    website?: string;
}

export interface AgeingData {
    lessThan31?: number;
    lessThan61?: number;
    lessThan91?: number;
    greaterThan90?: number;
}
export interface AdvertisementData {
    id?: number;
    name?: string;
    company?: string;
    active?: boolean;
    startDate?: Date;
    endDate?: Date;
    displayPeriod?: number;
    rank?: number;
    externalUrl?: string;
    image?: string;
    useIn?: string;
    updateCounter?: number;
}

export interface AuthenticationResult {
    success?: boolean;
    name?: string;
    user?: UserInfo;
    authToken?: string;
    exception?: string;
    failureType?: AuthFailureType;
    clubMembership?: ClubMembership;
}

export interface BankCardInfo {
    cardType?: string;
    cardNumber?: string;
    validFrom?: Date;
    expiry?: Date;
    nameOnTheCard?: string;
    cvv?: string;
    cardVendor?: string;
    issuingBank?: string;
}

export interface BaseResult {
    success?: boolean;
    message?: string;
}

export interface BuggyAvailabilityStat {
    totalBuggies?: number;
    totalBuggiesBooked?: number;
    totalAssigned?: number;
    totalBuggiesPaid?: number;
    availableBuggies?: number;
    availableBuggiesAm?: number;
    availableBuggiesPm?: number;
    totalBookedAm?: number;
    totalAssignedAm?: number;
    totalPaidAm?: number;
    totalBookedPm?: number;
    totalAssignedPm?: number;
    totalPaidPm?: number;
    actualRequested?: number;
    actualRequestedAm?: number;
    actualRequestedPm?: number;
}

export interface ClubAnalysis {
    success?: boolean;
    errorMessage?: string;
    clubId?: number;
    clubName?: string;
    clubImage?: string;
    clubTag?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    description?: string;
    courseAnalysisInfo?: CourseAnalysis[];
}

export interface ClubInfo {
    id?: number;
    name?: string;
    clubId?: number;
    clubName?: string;
    clubImage?: string;
    clubThumbnail?: string;
    clubLogo?: string;
    clubTag?: string;
    latitude?: number;
    longitude?: number;
    averageRating?: number;
    address?: any; //string;
    description?: string;
    website?: string;
    phone1?: string;
    phone2?: string;
    courses?: CourseInfo[];
    distanceInKm?: number;
    virtualClub?: boolean;
    timeZone?: TimeZoneData;
    countryId?: string;
    countryName?: string;
    country?: CountryData;
    clubAddresses?: ClubAddress[];
    clubGroups?: CourseGroup[];
}
export interface NewGameInfo {
    club?: ClubInfo;
    courses: Array<CourseInfo>;
    players: Array<PlayerInfo>;
    groupSelected?: boolean;
    availablePlayers?: Array<PlayerInfo>;
}

export interface PlayerCourseRound extends PlayerInfo {
    courseHandicap: CourseHandicapDetails;
}

export interface ClubList extends PagedResult {
    clubs?: ClubInfo[];
}

export interface ClubMembership {
    homeClub?: boolean;
    membershipNumber?: string;
    status?: string; //ClubMembershipStatus;
    clubHandicap?: number;
    m2uHandicap?: number;
    membershipType?: any;
    club?: ClubData | ClubInfo;
    player?: PlayerData;
    hcpDetail?: ClubHandicap;
    nhsHcpDetail?: ClubHandicap;
}

export interface Country {
    id?: string;
    name?: string;
    iso2Code?: string;
    iso3Code?: string;
    currencyId?: string;
    currencyName?: string;
    currencySymbol?: string;
    sportCode?: string;
    flagUrl?: string;
}

export interface CountryData {
    id?: string;
    name?: string;
    iso2Code?: string;
    iso3Code?: string;
    dialCode?: string;
    currencyCode?: string;
    currencyName?: string;
    currencySymbol?: string;
    sportCode?: string;
    flagUrl?: string;
}

export interface CourseAnalysis {
    courseId?: number;
    courseName?: string;
    coursePar?: number;
    photoUrl?: string;
    courseHoleAnalysisInfo?: CourseHoleAnalysis[];
}

export interface CourseGroup {
    displayOrder?: number;
    name?: string;
    courseId?: number;
}

export interface CourseHoleAnalysis {
    holeId?: number;
    holeNo?: number;
    holePar?: number;
    holeIndex?: number;
    scoreStatistic?: ScoreStatistic;
}

export interface CourseHoleInfo {
    holeId?: number;
    courseHoleNumber?: number;
    holeNo?: number;
    holePar?: number;
    latitude?: number;
    longitude?: number;
    holeDescription?: string;
    holeDistanceBlack?: number;
    holeDistanceBlue?: number;
    holeDistanceRed?: number;
    holeDistanceWhite?: number;
    holeImage?: string;
    holeThumbnail?: string;
    holeIndex?: number;
    holeIndexIn?: number;
    holeDistances?: HoleDistance[];
}

export interface CourseInfo {
    courseId?: number;
    displayOrder?: number;
    gameCourseId?: number;
    whichNine?: number;
    courseName?: string;
    courseGroup?: string;
    coursePar?: number;
    photoUrl?: string;
    thumbnail?: string;
    description?: string;
    indexToUse?: number;
    holes?: CourseHoleInfo[];
    teeBoxes?: TeeBoxData[];
}

export interface CurrencyData {
    id?: string;
    name?: string;
    symbol?: string;
}

export interface DaySpecification {
    dayIds?: number[];
}

export interface DocumentList {
    documents?: string[];
}

export interface EInvoicingEntity {
    id?: number;
    name?: string;
    taxIdentificationNumber?: string;
    individual?: boolean;
    businessRegistrationNumber?: string;
    sst?: string;
    tourismNumber?: string;
    country?: CountryData;
    address?: AddressData;
    markForDelete?: boolean;
    idType?: string;
    idValue?: string;
}

export interface EInvoicingEntityForm extends AddressForm {
    incomeTaxNumber?: string;
    individual?: boolean;
    companyName?: string;
    businessRegistrationNumber?: string;
    sst?: string;
    tourismNumber?: string;
    idType?: string;
    idValue?: string;
}

export interface EInvoicingEntityPage extends PagedData<EInvoicingEntity> {
}

export interface ErrorInfo {
    status?: number;
    errorCode?: string;
    errorMessage?: string;
    timestamp?: Date;
}

export interface FlightData {
    sequence?: number;
    flightNumber?: string;
    startHole?: number;
    startTime?: string; // | Date;
    actualStartTime?: Date;
    groupName?: string;
    roundSessionId?: number;
sessionTime?: Date;
    roundSessionSequence?: number;
    competition?: CompetitionData;
    gameRound?: GameRoundData;
    flightMembers?: PlayerInFlightData[];
    gender?: string;
    minHandicap?: number;
    maxHandicap?: number;
}

export interface FriendRequest {
    requestByPlayer?: boolean;
    player?: PlayerInfo;
}

export interface FriendRequestList extends PagedResult {
    friendRequests?: FriendRequest[];
}

export interface GameRoundCourseData {
    id?: number;
    name?: string;
    whichNine?: number;
    indexSetToUse?: number;
    course?: ClubCourseData;
}

export interface GameRoundData {
    id?: number;
    name?: string;
    roundNo?: number;
    description?: string;
    roundDate?: Date;
    roundDateTime?: Date;
    edited?: boolean;
    flightsPublished?: boolean;
    status?: GameRoundStatus;
    deriveHandicap?: boolean;
    createdOn?: Date;
    createdBy?: string;
    club?: ClubData;
    gameRoundCourses?: GameRoundCourseData[];
    sessions?: CompetitionRoundSession[];
}

export interface GameRoundInfo {
    id?: number;
    roundNo?: number;
    roundDate?: Date;
    status?: GameRoundStatus;
    inProgress?: boolean;
    nextRound?: boolean;
    courseNames?: string[];
    netTotal?: number;
    grossTotal?: number;
    netPosition?: number;
    grossPosition?: number;
    publishFlights?: boolean;
}

export interface HoleDistance {
    teebox?: string;
    distance?: number;
    unit?: string;
}

export interface Holiday {
    holidayOn?: Date;
    name?: string;
    nationalHoliday?: boolean;
    states?: State[];
}

export interface HolidayCalendar {
    fromDate?: Date;
    toDate?: Date;
    holidays?: Holiday[];
}

export interface HomeItemIcon {
    id?: number;
    homeItem?: string;
    club?: ClubDataLite;
    partner?: DiscountCompany;
    iconUrl?: string;
    itemShape?: string;
}

export interface IPersistenceEnum<T> {
    value?: T;
}

export interface ItemRating {
    itemId?: string;
    rating?: number;
}

export interface Location {
    id?: number;
    countryId?: string;
    countryName?: string;
    state?: string;
    city?: string;
}

export interface LocationData {
    name?: string;
    latitude?: number;
    longitude?: number;
}

export interface MygolfAmount {
    amountType?: AmountType;
    amount?: number;
}

export interface OfflinePayment {
    currency?: string;
    paidByName?: string;
    paidByEmail?: string;
    paidByPhone?: string;
    paymentMethod?: string;
    amount?: number;
    remarks?: string;
}

export interface OnClickAction {
    actionId?: string;
    actionType?: string | OnClickActionType;
    actionValue?: string;
}

export interface OrganizerInfo {
    organizerId?: number;
    registrationNumner?: string;
    name?: string;
    shortName?: string;
    description?: string;
    dateJoined?: Date;
    status?: string;
    organizerImage?: string;
    addressInfo?: AddressInfo;
    clubId?: number;
    contactPerson?: string;
    createdOn?: Date;
    createdBy?: string;
}

export interface OrganizerList extends PagedResult {
    organizers?: OrganizerInfo[];
}

export interface PagedData<T> {
    items?: T[];
    totalPages?: number;
    currentPage?: number;
    totalItems?: number;
    totalInPage?: number;
    success?: boolean;
    errorMessage?: string;
}

export interface PagedResult {
    totalPages?: number;
    currentPage?: number;
    totalItems?: number;
    totalInPage?: number;
    success?: boolean;
    errorMessage?: string;
}

export interface PaymentBillInfo {
    bill?: number;
    collection?: number;
    paid?: string;
    state?: string;
    status?: string;
    amount?: number;
    email?: string;
    mobile?: string;
    name?: string;
    deliver?: string;
    url?: string;
    currency?: string;
    description?: string;
    signature?: string;
    html?: string;
    id?: string;
    collection_id?: string;
    paid_amount?: number;
    due_at?: Date;
    payement_method?: string;
    payment_gateway?: string;
    reference_1_label?: string;
    reference_1?: string;
    reference_2_label?: string;
    reference_2?: string;
    remark?: string;
    redirect_url?: string;
    callback_url?: string;
    payment_type?: string;
    payer_type?: string;
    paid_by?: number;
    paying_player_name?: string;
    paying_player_email?: string;
    paying_player_phone?: string;
    paid_at?: Date;
    created_on?: Date;
    updated_on?: Date;
    paid_for?: PaymentPlayerInfo[];
    bill_type?: string;
    bill_type_id?: string;
    error_desc?: string;
    auth_code?: string;
    credit_card_name?: string;
    credit_card_no?: string;
    credit_card_bank?: string;
    credit_card_country?: string;
    merchant_code?: string;
    merchant_key?: string;
    api_key?: string;
    "x-signature"?: string;
    payment_id?: string;
}

export interface PaymentBillList extends PagedResult {
    paymentBills?: PaymentBillInfo[];
}

export interface PaymentCollectionInfo {
    collection?: number;
    title?: string;
    type?: string;
    description?: string;
    amount?: number;
    tax?: number;
    photo?: PaymentPhotoInfo;
    logo?: PaymentLogoInfo;
    splitPayment?: PaymentSplitInfo[];
    status?: string;
    url?: string;
    competition_id?: number;
    club_id?: number;
    premium_feature_pricing_id?: number;
    id?: string;
    reference_1_label?: string;
    reference_2_label?: string;
    email_link?: string;
    fixed_amount?: string;
    fixed_quantity?: string;
    payment_button?: string;
    created_by?: number;
    created_on?: Date;
}

export interface PaymentCollectionList extends PagedResult {
    paymentCollections?: PaymentCollectionInfo[];
}

export interface PaymentGatewayInfo {
    id?: string;
    type?: string;
    name?: string;
    description?: string;
    country_id?: string;
    currency_id?: string;
    http_server?: string;
    api_key?: string;
    x_signature?: string;
    merchant_code?: string;
    merchant_key?: string;
    callback_url?: string;
    redirect_url?: string;
    payment_url?: string;
    internal_payment_url?: string;
    signature_algorithm?: string;
    signature_format?: string;
}

export interface PaymentGatewayStatementDetail {
    reference?: string;
    paymentDate?: Date;
    amount?: number;
    paymentMethod?: string;
    discount?: number;
    gatewayCommission?: number;
    otherCommission?: number;
    gst?: number;
    paidByGateway?: number;
}

export interface PaymentLogoInfo {
    thumb_url?: string;
    avatar_url?: string;
}

export interface PaymentMethod {
    id?: string;
    name?: string;
}

export interface PaymentMethods {
}

export interface PaymentPhotoInfo {
    retina_url?: string;
    avatar_url?: string;
}

export interface PaymentPlayerInfo {
    player_id?: number;
}

export interface PaymentSplitInfo {
    email?: string;
    fixed_cut?: number;
    variable_cut?: number;
    split_header?: string;
}

export interface PaymentTestInfo {
    id?: string;
    amount?: number;
    my_message?: string;
    paid_date?: Date;
    paid_days?: number;
    ref_no?: string;
    payment_gateway?: string;
}

export interface PhoneNumbers {
    numbers?: string[];
    primaryNumber?: string;
}

export interface PlainScoreCard extends BaseResult {
    success?: boolean;
    message?: string;
    competition?: boolean;
    competitionId?: number;
    competitionName?: string;
    competitionRound?: string;
    scoringFormat?: string;
    clientId?: string;
    finished?: boolean;
    lockedBy?: string;
    editable?: boolean;
    scoringFinished?: boolean;
    gameRoundId?: number;
    roundNumber?: number;
    clubId?: number;
    clubName?: string;
    playedOn?: string | Date; //Date;
    startTime?: string;
    flightNumber?: string;
    participants?: string;
    courseNames?: string;
    startingHole?: number;
    fullInfo?: boolean;
    flightChanged?: boolean;
    courses?: CourseInfo[];
    playerRoundScores?: PlayerRoundScores[];
    frontNineTotal?: number;
    backNineTotal?: number;
    totalScore?: number;
    playerTotals?: string;
    roundDateTime?: Date;
    currentHole?: number;
    dirty?: boolean;
    bookingId?: number;
    flightMembers?: Array<FlightMember>;
}

export interface PlainScorecardPage extends PagedData<PlainScoreCard> {
}
export interface PlayerCategoryData {
    id?: number;
    name?: string;
    displaySequence?: number;
    forGrouping?: boolean;
    fromHandicap?: number;
    toHandicap?: number;
    gender?: string;
}

export interface PlayerInFlightData {
    id?: number;
    groupName?: string;
    flightNo?: string;
    startingHole?: number;
    player?: PlayerDataLite; // | PlayerData;
    team?: TeamData;
    buggy?: string;
    buggyId?: number;
    playerCategoryId?: number;
    playerCategoryName?: string;
    scorer?: PlayerData | PlayerDataLite;
    handicap?: number;
    handicapIndex?: number;
    handicapStatus?: string;
    status?: PlayerRoundStatus;
    keepFlight?: boolean;
    actualStartTime?: Date;
    ocbApplication?: OcbAppliedData;
    categoryOcbApplication?: OcbAppliedData;
    teeBox?: TeeBoxData;
    grossTotal?: number;
    netTotal?: number;
    flightSequence?: number;
    playerTotals?: PlayerTotalData[];
    scores?: PlayerScoreData[];
    completed?: boolean;
    inProgress?: boolean;
    withdrawn?: boolean;
    pending?: boolean;
}

export interface FlightGenComparator extends Comparator<PlayerInFlightData> {
}

export interface GenderComparator extends Comparator<PlayerInFlightData> {
}

export interface HandicapComparator extends Comparator<PlayerInFlightData> {
}

export interface PlayerScoreData {
    id?: number;
    course?: GameRoundCourseData;
    hole?: ClubCourseHoleData;
    holeNo?: number;
    actualScore?: number;
    adjustedScore?: number;
    netScore?: number;
    parScore?: number;
    pointScore?: number;
    holeIndex?: number;
    remarks?: string;
}

export interface PlayerTotalData {
    whichNine?: number;
    grossTotal?: number;
    netTotal?: number;
}

export interface PlayerGroup {
    id?: number;
    groupName?: string;
    players?: PlayerInfo[];
}

export interface PlayerGroupList extends PagedResult {
    playerGroups?: PlayerGroup[];
}

export interface PlayerHomeInfo {
    playerId?: number;
    playerName?: string;
    totalScoreCards?: number;
    totalFriends?: number;
    activeCompetitions?: number;
    error?: boolean;
    errorMessage?: string;
    player?: PlayerInfo;
    testUser?: boolean;
    compsActiveToday?: CompetitionInfo[];
}

export interface PlayerInfo {
    userId?: number;
    playerId?: number;
    playerName?: string;
    firstName?: string;
    lastName?: string;
    nickName?: string;
    email?: string;
    phone?: string;
    handicap?: number;
    handicapIndex?: number;
    mygolfHandicapIndex?: number;
    handicapIn?: string;
    gender?: string;
    countryId?: string;
    countryName?: string;
    sportCode?: string;
    flagUrl?: string;
    photoUrl?: string;
    thumbnail?: string;
    dateJoined?: Date;
    birthdate?: Date;
    friendSince?: Date;
    teeOffFrom?: string;
    nhsNumber?: string;
    status?: string;
    errorMessage?: string;
    addressInfo?: AddressInfo;
    allowEdit?: boolean;
    membership?: string;
    nationalityId?: string;
    nationalityName?: string;
    nationalityFlag?: string;
    id?: number;
    govtDocumentNumber?: string;
}

export interface PlayerList extends PagedResult {
    players?: PlayerInfo[];
}

export interface PlayerPerformance {
    success?: boolean;
    errorMessage?: string;
    bestScore?: number;
    totalGrossScore?: number;
    totalScorecards?: number;
    averageScore?: number;
    playerPerformances?: PlayerPerformanceInfo[];
}

export interface PlayerPerformanceDetail {
    success?: boolean;
    errorMessage?: string;
    scoreStatistic?: ScoreStatistic;
    playerPerformanceDetails?: PlayerPerformanceDetailInfo[];
}

export interface PlayerPerformanceDetailInfo {
    gameRoundId?: number;
    playeRoundId?: number;
    gameType?: string;
    roundNo?: number;
    firstNineCourseName?: string;
    secondNineCourseName?: string;
    roundDate?: Date;
    inTotalGross?: number;
    outTotalGross?: number;
    totalGross?: number;
    inTotalNet?: number;
    outTotalNet?: number;
    totalNet?: number;
    competitionId?:number;
    clubId?: number;
    clubName?: string;
    competitionName?: string;
}

export interface PlayerPerformanceInfo {
    score?: number;
}

export interface PlayerRegistrationResult {
    success?: boolean;
    email?: string;
    userId?: number;
    playerId?: number;
    errorMessage?: string;
}

// export interface PlayerRoundScores {
//         playerRoundId?: number;
//         playerId?: number;
//         playerName?: string;
//         nickName?: string;
//         teamName?: string;
//         gender?: string;
//         photoUrl?: string;
//         thumbnail?: string;
//         teeOffFrom?: string;
//         playerHandicap?: number;
//         courseRating?: number;
//         slopeRating?: number;
//         scoringPlayerId?: number;
//         scorerName?: string;
//         frontNineTotal?: number;
//         backNineTotal?: number;
//         totalScore?: number;
//         diffGrossToPar?: number;
//         status?: string;
//         startTime?: Date;
//         actualStartTime?: Date;
//         frontNineNetTotal?: number;
//         backNineNetTotal?: number;
//         totalNetScore?: number;
//         totalNetAdjustedScore?: number;
//         diffNetToPar?: number;
//         scores?: PlayerScore[];
//         totals?: PlayerTotals[];

// }

export interface PlayerScore {
    scorecardId?: number;
    whichNine?: number;
    gameCourseId?: number;
    courseHoleId?: number;
    courseId?: number;
    holeNumber?: number;
    courseName?: string;
    holeIndex?: number;
    parScore?: number;
    actualScore?: number;
    netScore?: number;
    adjustedScore?: number;
    points?: number;
    shotsAllowed?: number;
}

export interface PlayerTotals {
    whichNine?: number;
    grossTotal?: number;
    netTotal?: number;
}

export interface PriceComponent {
    id?: string;
    name?: string;
    description?: string;
}

export interface RatingItem {
    id?: string;
    name?: string;
    description?: string;
}

export interface Ratings<T> {
    startDate?: Date;
    endDate?: Date;
    averageRating?: number;
    ratings?: T[];
}

export interface RefundInstance {
    id?: number;
    createdOn?: Date;
    refundAmount?: number;
    description?: string;
    clubRefund?: boolean;
    refundMode?: RefundMode;
    refundReason?: string;
    playerRefunded?: PlayerData;
    club?: ClubData;
    refundIssuedBy?: UserAuthentication;
    booking?: TeeTimeBooking;
    transaction?: ClubTransaction;
    partner?: DiscountCompany;
    agentTransactionId?: number;
}

export interface Result extends BaseResult {
}

export interface ScoreStatistic {
    albatros?: number;
    eagle?: number;
    birdie?: number;
    par?: number;
    bogey?: number;
    bogey2?: number;
    bogey3?: number;
    worse?: number;
    totalScore?: number;
    totalRound?: number;
    average?: number;
}

export interface ScorecardList extends PagedResult {
    scorecards?: Array<PlainScoreCard>;//[];
}

export interface ScorecardSearchForm {
    search?: string;
    handicapStatus?: string[];
    statuses?: PlayerRoundStatus[];
    startDate?: Date;
    endDate?: Date;
    startTime?: Date;
    endTime?: Date;
    competitionId?: number;
    scorecardType?: string;
    sortBy?: string;
    roundNo?: number;
    roundId?: number;
    competitionPlayer?: number;
    flightNo?: string;
    withdrawalList?: boolean;
    activeList?: boolean;
    searchType?: string;
    clubId?: number;
    playedBy?: string;
    playedAt?: string;
}
export interface ScoringFormatData {
    id?: number;
    name?: string;
    adjustmentFactor?: number;
    usedFor?: string;
    description?: string;
    createdOn?: Date;
    createdBy?: string;
}

export interface SearchCriteria {
    searchType?: string;
    onlyParticipating?: boolean;
    onlyFavorites?: boolean;
    searchWithinDistance?: boolean;
    clubId?: number;
    organizerId?: number;
    maxDistance?: number;
    clubsWithMembership?: boolean;
    searchText?: string;
    periodLength?: number;
    periodType?: string;
    countryId?: string;
}

export interface ServerInfo {
    minClientVersion?: number;
    maxClientVersion?: number;
    pushServerInfo?: PushServerInfo;
    showAds?: boolean;
    adUrls?: string[];
    webSocketPort?: number;
    botsOut?: boolean;
    enablePlayerAppBooking?: boolean;
    hidxRequiresSubscription?: boolean;
    /**
    @param hidxRequiresSubscription for server info
    */
}

export interface SponsorData {
    id?: number;
    name?: string;
    registerNo?: string;
    status?: string;
    contactEmail?: string;
    contactPerson?: string;
    image?: string;
    description?: string;
    createdBy?: string;
    createdOn?: Date;
    dateJoined?: Date;
    address?: AddressData;
    organizer?: OrganizerData;
    country?: CountryData;
}

export interface SponsorInfo {
    id?: string;
}

export interface State {
    stateCode?: string;
    stateName?: string;
}
export interface TeamData {
    id?: number;
    name?: string;
    logo?: string;
    description?: string;
    teamCaptain?: PlayerData;
    club?: ClubData;
}

export interface TeeBoxData {
    id?: number;
    name?: string;
    image?: string;
    description?: string;
}
export interface TimeRange {
    start?: Date;
    end?: Date;
}

export interface TimeRange {
    start?: Date;
    end?: Date;
}

export interface TimeZoneData {
    id?: string;
    name?: string;
    usesDaylight?: boolean;
    offsetMinutesUtc?: number;
    offsetSpec?: string;
}

export interface UserHomeItem {
    id?: number;
    user?: UserDataLite;
    homeItem?: string;
    hide?: boolean;
    sequence?: number;
}

export interface UserInfo {
    userId?: number;
    userName?: string;
    password?: string;
    name?: string;
    userType?: UserType;
    admin?: boolean;
    clubId?: number;
    clubGroup?: string;
    clubs?: number[];
    playerId?: number;
    organizerId?: number;
    caddieId?: number;
    partnerId?: string;
    roles?: string[];
    authorities?: string[];
    profileImage?: string;
}

export interface ValidationResult {
    valid?: boolean;
    validationMessage?: string;
}

export interface AdFormData {
    adId?: number;
    name?: string;
    companyName?: string;
    startDate?: Date;
    endDate?: Date;
    displayPeriod?: number;
    rank?: number;
    useIn?: string;
    externalUrl?: string;
    adImageFile?: MultipartFile;
}

export interface Create {
}

export interface Update {
}

export interface Advertisement {
    id?: number;
    name?: string;
    companyName?: string;
    active?: boolean;
    startDate?: Date;
    endDate?: Date;
    displayPeriod?: number;
    rank?: number;
    useIn?: string;
    externalUrl?: string;
    imageUrl?: string;
    updateCounter?: number;
    autoInclude?: boolean;
}

export interface AdvertisementData {
    id?: number;
    name?: string;
    company?: string;
    active?: boolean;
    startDate?: Date;
    endDate?: Date;
    displayPeriod?: number;
    rank?: number;
    externalUrl?: string;
    image?: string;
    useIn?: string;
    updateCounter?: number;
}

export interface AdvertisementList extends PagedResult {
    advertisements?: Advertisement[];
}

export interface Advertisements extends PagedData<Advertisement> {
}

export interface News {
    id?: number;
    title?: string;
    priority?: number;
    active?: boolean;
    newsBrief?: string;
    fullNews?: string;
    startDate?: Date;
    endDate?: Date;
    displayWholeDay?: boolean;
    startTime?: Date;
    endTime?: Date;
    club?: ClubDataLite;
    partner?: DiscountCompany;
    onClick?: OnClickAction;
    images?: string[];
}

export interface NewsForm {
    title?: string;
    priority?: number;
    active?: boolean;
    newsBrief?: string;
    fullNews?: string;
    startDate?: Date;
    endDate?: Date;
    displayWholeDay?: boolean;
    startTime?: Date;
    endTime?: Date;
    images?: MultipartFile[];
    actionType?: OnClickActionType;
    actionValue?: string;
}

export interface NewsPage extends PagedData<News> {
}

export interface OfferAndAdvertisement {
    id?: number;
    title?: string;
    priority?: number;
    active?: boolean;
    shortDescription?: string;
    fullDescription?: string;
    startDate?: Date;
    endDate?: Date;
    displayWholeDay?: boolean;
    startTime?: Date;
    endTime?: Date;
    club?: ClubDataLite;
    partner?: DiscountCompany;
    onClick?: OnClickAction;
    images?: string[];
}

export interface OffersAndAdvertisementForm {
    title?: string;
    priority?: number;
    active?: boolean;
    shortDescription?: string;
    fullDescription?: string;
    startDate?: Date;
    endDate?: Date;
    displayWholeDay?: boolean;
    startTime?: Date;
    endTime?: Date;
    images?: MultipartFile[];
    actionType?: OnClickActionType;
    actionValue?: string;
}

export interface OffersAndAdvertisementPage extends PagedData<OfferAndAdvertisement> {
}

export interface ApiAuditLog {
    id?: number;
    auditDateTime?: Date;
    auditDate?: Date;
    authentication?: UserAuthentication;
    userId?: number;
    requestUrl?: string;
    apiType?: string;
    apiCategory?: string;
    apiGroup?: string;
    apiOperation?: string;
    club?: ClubDataLite;
    clubId?: number;
    partner?: DiscountCompany;
    partnerId?: string;
    player?: PlayerDataLite;
    playerId?: number;
    reference?: string;
    additionalReference1?: string;
    additionalReference2?: string;
    success?: boolean;
    pathParameters?: string;
    requestParameters?: string;
    requestBody?: string;
    responseBody?: string;
    requestHeaders?: string;
    responseHeaders?: string;
    exception?: string;
}

export interface ApiAuditLogPage extends PagedData<ApiAuditLog> {
}

export interface ApiAuditSetting {
    id?: number;
    apiOperation?: string;
    apiCategory?: string;
    apiGroup?: string;
    useSetting?: boolean;
    disabled?: boolean;
    logRequestHeaders?: boolean;
    logRequestBody?: boolean;
    logResponseHeaders?: boolean;
    logResponseBody?: boolean;
    logException?: boolean;
    description?: string;
}

export interface AuditChanges {
    entityName?: string;
    changeType?: AuditChangeType;
    propertyChanges?: AuditPropertyChange[];
}

export interface AuditPropertyChange {
    propertyName?: string;
    prevValue?: any;
    newValue?: any;
}

export interface AuditRevision {
    revision?: string;
    timestamp?: Date;
    username?: string;
    action?: string;
    totalChanges?: number;
    auditChanges?: AuditChanges;
}

export interface AuditedEntity {
    name?: string;
    table?: string;
    jpaClass?: string;
}

export interface Availability {
    availableOn?: Date;
    available?: boolean;
    weeklyHoliday?: boolean;
    reason?: string;
}

export interface BuggyAssignment {
    id?: number;
    assignmentDate?: Date;
    assignmentStart?: Date;
    assignmentEnd?: Date;
    totalMinutes?: number;
    flightAssigned?: TeeTimeFlight;
    bookingInfo?: BookingInfo;
    timeBooking?: TeeTimeBooking;
}

export interface BuggyAssignmentInfo {
    id?: number;
    assignmentDate?: Date;
    assignmentStart?: Date;
    flightAssigned?: TeeTimeFlight;
    bookingInfo?: BookingInfo;
    timeBooking?: TeeTimeBooking;
}

export interface BuggyData extends IAvailableOnDay {
    id?: number;
    buggyNo?: string;
    name?: string;
    properties?: string;
    physicalId?: string;
    dateStart?: Date;
    maintenanceDate?: Date;
    make?: string;
    model?: string;
    status?: string;
    seater?: number;
    buggyImage?: string;
    buggyQCode?: string;
    description?: string;
    lastAssigned?: Date;
    lastCompleted?: Date;
    buggyType?: BuggyType;
    priority?: number;
    available?: boolean;
    club?: ClubDataLite;
    availabilityDays?: { [index: string]: boolean };
    assignments?: BuggyAssignmentInfo[];
}

export interface BuggyDataPage extends PagedData<BuggyData> {
}

export interface BuggyDayDetails {
    date?: Date;
    buggy?: BuggyData;
    assignments?: BuggyAssignment[];
    maxShifts?: number;
    active?: boolean;
}

export interface BuggyType {
    typeId?: string;
    typeName?: string;
    description?: string;
    maxSeats?: number;
    assignmentRequired?: boolean;
    maxShifts?: number;
    minMinutesBetweenShifts?: number;
    assignableTo?: string[];
    pricingComponent?: TeeTimePriceComponent;
    singleSeatComponent?: TeeTimePriceComponent;
}

export interface CaddieAssignmentInfo {
    id?: number;
    assignmentDate?: Date;
    assignmentStart?: Date;
    flightAssigned?: TeeTimeFlight;
    bookingInfo?: BookingInfo;
    timeBooking?: TeeTimeBooking;
    bookingAdditionalItem?: number;
}

export interface CaddieRating {
    id?: number;
    player?: PlayerData;
    rating?: number;
    ratedOn?: Date;
    review?: string;
    playerName?: string;
    assignment?: CaddyAssignment;
}

export interface CaddieUpdate {
    staffId?: string;
    nickName?: string;
    identificationNo?: string;
    dateJoined?: Date;
    grade?: number;
    qcode?: string;
    description?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: Date;
    status?: string;
    nationality?: string;
    photo?: MultipartFile;
    availability?: boolean[];
}
export interface BuggyUnavailability {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    remarks?: string;
}

export interface CaddyAssignment {
    id?: number;
    assignmentDate?: Date;
    assignmentStart?: Date;
    assignmentEnd?: Date;
    totalMinutes?: number;
    flightAssigned?: TeeTimeFlight;
    timeBooking?: TeeTimeBooking;
    bookingInfo?: BookingInfo;
    lastUpdatedAt?: Date;
    lastUpdatedBy?: UserAuthentication;
}

export interface CaddyData extends IAvailableOnDay {
    id?: number;
    firstName?: string;
    lastName?: string;
    nickName?: string;
    gender?: string;
    staffId?: string;
    identificationNo?: string;
    dateOfBirth?: Date;
    dateJoined?: Date;
    club?: ClubData;
    nationality?: CountryData;
    caddyImage?: string;
    caddyQcode?: string;
    description?: string;
    status?: string;
    averageRating?: number;
    grade?: CaddyGrade;
    authentication?: UserAuthentication;
    lastAssigned?: Date;
    lastCompleted?: Date;
    priority?: number;
    available?: boolean;
    availabilityDays?: { [index: string]: boolean };
    assignments?: CaddieAssignmentInfo[];
}

export interface ValidateSave {
}

export interface CaddyDataPage extends PagedData<CaddyData> {
}

export interface CaddyDayDetails {
    date?: Date;
    caddy?: CaddyData;
    assignments?: CaddyAssignment[];
    maxShifts?: number;
    present?: boolean;
}

export interface CaddyGrade {
    id?: number;
    name?: string;
    price?: number;
}

export interface ChargeToClub {
    transactionDate?: Date;
    reference?: string;
    referenceDate?: Date;
    chargeType?: string;
    description?: string;
    amount?: number;
    chargingPlayer?: number;
}

export interface ClubAddress {
    name?: string;
    defaultAddress?: boolean;
    address?: AddressData;
}

export interface ClubAffiliateMember {
    clubId?: number;
    clubName?: string;
    membershipNumber?: string;
    membershipType?: string;
    membershipTypeName?: string;
    homeClub?: boolean;
    bookingDiscountId?: number;
    bookingPlayerType?: string;
    addlCharge?: number;
    pricingComponent?: string;
}

export interface ClubAffiliation {
    id?: number;
    club?: ClubDataLite;
    clubAffiliated?: ClubDataLite;
    active?: boolean;
}

export interface ClubAffiliationAddlCharge {
    id?: number;
    clubAffiliation?: ClubAffiliation;
    startDate?: Date;
    endDate?: Date;
    amount?: number;
    priceComponent?: TeeTimePriceComponent;
}

export interface ClubAffiliationPricing {
    id?: number;
    clubAffiliation?: ClubAffiliation;
    startDate?: Date;
    endDate?: Date;
    teeTimeDiscount?: TeeTimeDiscount;
    bookingPlayerType?: BookingPlayerType;
    additionalCharge?: number;
    pricingComponent?: TeeTimePriceComponent;
}

export interface ClubAffiliationPricingForm {
    startDate?: Date;
    endDate?: Date;
    discountId?: number;
    bookingPlayerType?: string;
    additionalCharge?: number;
    pricingComponent?: string;
}

export interface ClubAgreement {
    club?: ClubData;
    bookingClubChargeType?: AmountType;
    bookingClubCharge?: number;
    bookingPlayerChargeType?: AmountType;
    bookingPlayerCharge?: number;
    documents?: DocumentList;
    competitionCharge?: number;
    competitionRegistrationFee?: number;
    registrationFeeType?: AmountType;
    reconPeriod?: Period;
}

export interface ClubBank {
    id?: number;
    name?: string;
    branch?: string;
    accountNo?: string;
    swiftCode?: string;
    referenceNo?: string;
    routingNo?: string;
    primaryAccount?: boolean;
    beneficiary?: string;
    address?: AddressData;
    club?: ClubData;
}

export interface ClubBankPage extends PagedData<ClubBank> {
}

export interface ClubCaddieSchedule {
    flightTime?: Date;
    bookingReference?: string;
    staffId?: string;
    identificationNo?: string;
    caddieImage?: string;
    caddieName?: string;
    caddieId?: number;
    buggyNo?: string;
    remarks?: string;
    status?: string;
}
export interface CaddyUnavailability {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    remarks?: string;
}

export interface ClubCourseData {
    id?: number;
    name?: string;
    courseGroup?: string;
    numberOfHoles?: number;
    type?: number;
    par?: number;
    rating?: number;
    slope?: number;
    description?: string;
    courseImage?: string;
    courseThumbnail?: string;
    shortCode?: string;
    displayOrder?: number;
    complete?: boolean;
    holes?: ClubCourseHoleData[];
    teeBoxes?: CourseTeeBoxData[];
    indexSets?: CourseIndexSet[];
}

export interface ClubCourseHoleData {
    id?: number;
    holeNo?: number;
    par?: number;
    indexOut?: number;
    indexIn?: number;
    latitude?: number;
    longitude?: number;
    description?: string;
    distanceBlack?: number;
    distanceBlue?: number;
    distanceRed?: number;
    distanceWhite?: number;
    distances?: { [index: string]: number };
    image?: string;
    thumbnail?: string;
}

export interface ClubCourseLite {
    id?: number;
    name?: string;
    numberOfHoles?: number;
    par?: number;
    rating?: number;
    slope?: number;
    description?: string;
    courseImage?: string;
    courseThumbnail?: string;
    shortCode?: string;
    displayOrder?: number;
    complete?: boolean;
}

export interface ClubCredit {
    club?: ClubData;
    currency?: CurrencyData;
    balance?: number;
    walletBalance?: number;
    creditLimit?: number;
    allowCredit?: boolean;
    creditLimitApplicable?: boolean;
    effectiveBalance?: number;
}

export interface ClubCustomer {
    customerCode?: string;
    club?: ClubData;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    address?: AddressData;
}

export interface ClubCustomerForm extends AddressForm {
    customerCode?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
}

export interface ClubData {
    id?: number;
    name?: string;
    clubName?: string;
    registerNo?: string;
    tag?: string;
    description?: string;
    status?: string;
    active?: boolean;
    address?: AddressData;
    contactPerson?: string;
    contactEmail?: string;
    clubImage?: string;
    latitude?: number;
    longitude?: number;
    virtualClub?: boolean;
    timeZone?: TimeZoneData;
    clubThumbnail?: string;
    clubLogo?: string;
    averageRating?: number;
    validClub?: boolean;
    defaultHandicapSystem?: HandicapSystem;
    courses?: ClubCourseData[];
    clubAddresses?: ClubAddress[];
    organizer?: OrganizerData;
    bookingReferencePrefix?: string;
    clubId?: number;
    country?: CountryData;
    taxNo?: string;
    financialEntityName?: string;
    clubGroup?: ClubGroup;
    amenities?: string[];
    courseGroups?: CourseGroup[];
}

export interface ClubDataLite {
  clubId?: number;
  id?: number;
  name?: string;
  clubName?: string;
  clubImage?: string;
  clubThumbnail?: string;
  clubLogo?: string;
  countryId?: string;
  countryName?: string;
  currencyId?: string;
  currencyName?: string;
  currencySymbol?: string;
  bookingReferencePrefix?: string;
  socialClub?: boolean;
  amenities?: string[];
  city?: string;
  state?: string;
}

export interface ClubDataLitePage extends PagedData<ClubDataLite> {
}

export interface ClubDataPage extends PagedData<ClubData> {
}

export interface LocalOutletType {
    id?: string;
    name?: string;
}
export interface ClubFacilityExtended extends ClubOutlet {
    // outletType?: LocalOutletType;
    itemType?: string;
    itemCount?: number;
    bookable?: boolean;
    // images?: Array<string>;
    openingHours?: any;
    contactInformation?: Array<string>;
    clubId?: number;
    clubName?: string;
    facilityId?: string;
    facilityName?: string;
    description?: string;
    facilityImage?: string;
    active?: boolean;
    details?: any;
}
export interface ClubFacility {
    clubId?: number;
    clubName?: string;
    facilityId?: string;
    facilityName?: string;
    description?: string;
    facilityImage?: string;
    active?: boolean;
}

export interface ClubGroup {
    id?: string;
    name?: string;
    description?: string;
    logo?: string;
    clubs?: ClubDataLite[];
}

export interface ClubGroupForm {
    id?: string;
    name?: string;
    description?: string;
    logo?: MultipartFile;
}

export interface ClubGroupPage extends PagedData<ClubGroup> {
}

export interface ClubInvoiceNumberSetup {
    club?: ClubData;
    invoiceStream?: string;
    invoiceContext?: string;
}

export interface ClubInvoiceStream {
    stream?: string;
    club?: ClubData;
    invoiceNumberReset?: string;
    invoicePrefix?: string;
    temporalPrefixFormat?: string;
    invoiceSeparator?: string;
}

export interface ClubMemRenewalHistory {
    id?: number;
    membershipId?: number;
    membershipNumber?: string;
    playerId?: number;
    playerName?: string;
    renewed_on?: Date;
    prevExpiryDate?: Date;
    newExpiryDate?: Date;
    renewedBy?: UserAuthentication;
}

export interface ClubMember {
    id?: number;
    homeClub?: boolean;
    membershipNumber?: string;
    status?: MembershipStatus;
    dateJoined?: Date;
    dateExpired?: Date;
    dateRequested?: Date;
    clubHandicap?: number;
    m2uHandicap?: number;
    club?: ClubInfo;
    player?: PlayerData;
}

export interface ClubMemberInfoForBooking {
    member?: boolean;
    membershipNo?: string;
    suspended?: boolean;
    playerType?: string;
    maxGuests?: number;
}

export interface ClubMemberLite {
    club?: ClubDataLite;
    player?: PlayerDataLite;
    homeClub?: boolean;
    membershipNumber?: string;
    status?: string;
    clubHandicap?: number;
    m2uHandicap?: number;
    membershipType?: string;
}

export interface ClubMemberPage extends PagedData<ClubMember> {
}

export interface ClubMemberStatementOption {
    autoGeneration?: boolean;
    autoApprove?: boolean;
    sendEmail?: boolean;
    copyClub?: boolean;
    frequency?: StatementFrequency;
    dayOfMonth?: number;
    statementRunsAt?: Date;
    paymentStatusRunsAt?: Date;
}

// export interface ClubMembership {
//         homeClub?: boolean;
//         membershipNumber?: string;
//         // status?: string; //ClubMembershipStatus;
//         clubHandicap?: number;
//         m2uHandicap?: number;
//         // membershipType?: string;
//         // club?: ClubInfo;
//         player?: PlayerData;
//         hcpDetail?: ClubHandicap;
//         nhsHcpDetail?: ClubHandicap;
// }

// export interface ClubMembershipExtended extends ClubMembership {
export interface ClubMembershipExtended extends ClubMembership {
    hcpDetail?: ClubHandicap;
    nhsHcpDetail?: ClubHandicap;
    id?: number;
    club?: ClubInfo | ClubData;
    // membershipType?: ClubMembershipType;
    membershipNo?: string;
    player?: PlayerData;
    joinedOn?: Date;
    validUntil?: Date;
    depositAmountPaid?: number;
    primaryMembership?: boolean;
    status?: string; //MembershipStatus;
    playerApproval?: boolean;
    active?: boolean;
    playerHomeClub?: boolean;
    homeClub?: boolean;
    membershipNumber?: string;
    clubHandicap?: number;
    m2uHandicap?: number;
    statementEmail?: boolean;
    supplementaryContext?: string;
    correspondenceEmail?: string;
    lastUpdatedBy?: UserAuthentication;
    lastUpdatingUser?: number;
    lastUpdatedAt?: Date;
    onSuspension?: OnMembershipSuspension;
    playerTypeApplied?: string;
    guestsWhenSuspended?: number;
    deniedFacilities?: string[];
    suspensionRemarks?: string;
    memberImage?: string;
    additionalProperties?: { [index: string]: any };
    preventAutoSuspension?: boolean;
    lastReminderDate?: Date;
    passport?: string;
    icNumber?: string;
    legalName?: string;
    autoRenew?: boolean;
    autoRenewBefore?: number;
    incomeTaxNumber?: string;
    phoneNumber?: string;
    statusHistories?: ClubMembershipStatusHistory[];
    additionalCharges?: ClubMembershipAddlChg[];
    renewalHistory?: ClubMemRenewalHistory[];
    primaryMemberId?: number;
    primaryMembershipNo?: string;
    primaryPlayerId?: number;
    billToPrimary?: boolean;
    relationToPrimary?: string;
    einvoicingOption?: EInvoicingOption;
    einvoicingEntity?: EInvoicingEntity;
    effectivePlayerType?: string;
}

export interface ClubMembershipAddlChg {
    id?: number;
    clubMembershipCharge?: ClubMembershipCharge;
    startDate?: Date;
    endDate?: Date;
    lastChargeDate?: Date;
    totalApplied?: number;
    active?: boolean;
    amount?: number;
}

export interface ClubMembershipCharge {
    membershipType?: ClubMembershipType;
    chargeId?: string;
    name?: string;
    description?: string;
    amount?: number;
    recurringCharge?: boolean;
    periodType?: RecurringChargerPeriod;
    periodLength?: number;
    transactionType?: TransactionType;
    active?: boolean;
    optionalCharge?: boolean;
    firstTransactionDate?: Date;
    applicableTo?: MembershipChargeApplicableTo;
    applyOnRenewal?: boolean;
}

export interface ClubMembershipChargePage extends PagedData<ClubMembershipCharge> {
}

export interface ClubMembershipInfo extends Record {
}

export interface ClubMembershipOption {
    billingEnabled?: boolean;
    allowEdit?: boolean;
    statementOption?: ClubMemberStatementOption;
    paymentOption?: MemberPaymentOption;
}

export interface ClubMembershipPage extends PagedData<ClubMembership> {
}

export interface ClubMembershipProperty {
    propertyId?: string;
    propertyName?: string;
    description?: string;
}

export interface ClubMembershipStatusHistory {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    status?: MembershipStatus;
    active?: boolean;
    remarks?: string;
    onSuspension?: OnMembershipSuspension;
    playerTypeApplied?: string;
    deniedFacilities?: string[];
}

export interface ClubMembershipType {
    typeId?: string;
    typeName?: string;
    allowSupplementary?: boolean;
    termMembership?: boolean;
    bookingPlayerType?: BookingPlayerType;
    introduction?: boolean;
    maxMembers?: number;
    membersCanIntroduce?: boolean;
    maximumIntroduction?: number;
    maxGuests?: number;
    termsAndConditions?: string;
    paymentOption?: MemberPaymentOption;
    reminderOption?: ReminderOption;
    facilities?: ClubMembershipTypeFacility[];
}

export interface ClubMembershipTypeFacility {
    id?: number;
    clubFacility?: ClubFacility;
    availableToSupplementaryMember?: boolean;
}

export interface ClubOutlet {
    id?: number;
    name?: string;
    description?: string;
    outletType?: any;// | string;
    active?: boolean;
    address?: AddressData;
    club?: ClubData;
    images?: string[];
    bookableFacility?: boolean;
    displayToPublic?: boolean;
    minBookingDuration?: FacilityBookingDuration;
    defaultPricing?: FacilityPricing;
    outletTiming?: FacilityTiming;
    transactionType?: TransactionType;
    outletUsers?: UserAuthentication[];
    locations?: ClubFacilityItemLocation[];
    facilityItems?: ClubFacilityItem[];
    bookingRules?: FacilityBookingRules;
}

export interface ClubOutletForm extends AddressForm {
    name?: string;
    description?: string;
    outletType?: string;
    active?: boolean;
    bookableFacility?: boolean;
    displayToPublic?: boolean;
    minBookingDuration?: FacilityBookingDuration;
    transactionType?: string;
}

export interface ClubOutletPage extends PagedData<ClubOutlet> {
}

export interface ClubPaymentCode {
    paymentCode?: string;
    club?: ClubData;
    name?: string;
    description?: string;
    active?: boolean;
}

export interface ClubPaymentCodePage extends PagedData<ClubPaymentCode> {
}

export interface ClubPos {
    id?: number;
    name?: string;
    posCode?: string;
    description?: string;
    active?: boolean;
    club?: ClubData | ClubDataLite;
    clubOutlet?: ClubOutlet;
}

export interface ClubPosPage extends PagedData<ClubPos> {
}

export interface ClubPosPayment {
    sequence?: number;
    paymentCode?: string;
    paymentReference?: string;
    paymentAmount?: number;
    localAmount?: number;
    paymentCurrency?: string;
    exchangeRate?: number;
    tipAmount?: number;
    localTipAmount?: number;
    changeAmount?: number;
    localChangeAmount?: number;
    cardName?: string;
    commissionRate?: number;
    commission?: number;
}

export interface ClubPosSale {
    id?: number;
    salesDate?: Date;
    salesTime?: Date;
    billNo?: string;
    remarks?: string;
    grossAmount?: number;
    discountAmount?: number;
    taxApplied?: number;
    netAmount?: number;
    salesMode?: SalesMode;
    club?: ClubDataLite;
    pos?: ClubPos;
    posCode?: string;
    cashierId?: string;
    salesSource?: string;
    syncedToFinancial?: boolean;
    financialSyncReference?: string;
    financialSyncAt?: Date;
    serviceCharge?: number;
    adjustedAmount?: number;
    amountPayable?: number;
    productCategory?: string;
    membershipNumber?: string;
    financialSyncMessage?: string;
    player?: PlayerDataLite;
    email?: string;
    payments?: ClubPosPayment[];
    importInstance?: ClubPosSalesImport;
    importedBy?: UserAuthentication;
    playerAccountTransaction?: number;
}

export interface ClubPosSalePage extends PagedData<ClubPosSale> {
}

export interface ClubPosSaleTrxnMapping {
    id?: number;
    club?: ClubDataLite;
    outlet?: ClubOutlet;
    productCategory?: string;
    salesMode?: SalesMode;
    transactionType?: TransactionType;
}

export interface ClubPosSalesImpMessage {
    importInstanceId?: number;
    rowIndex?: number;
    messageType?: string;
    message?: string;
}

export interface ClubPosSalesImport {
    id?: number;
    importedAt?: Date;
    importedFrom?: string;
    totalImported?: number;
    totalSuccess?: number;
    totalError?: number;
    importedFileName?: string;
    fileUrl?: string;
    club?: ClubDataLite;
    reversed?: boolean;
    reversedOn?: Date;
    importedBy?: UserAuthentication;
    reversedBy?: UserAuthentication;
    messages?: ClubPosSalesImpMessage[];
}

export interface ClubPosSalesImportPage extends PagedData<ClubPosSalesImport> {
}

export interface ClubRating {
    id?: number;
    player?: PlayerData;
    playerName?: string;
    playerEmail?: string;
    playerPhone?: string;
    overallRating?: number;
    ratedOn?: Date;
    review?: string;
    itemizedRatings?: ItemRating[];
}

export interface ClubRevenueTransaction {
    transactionDate?: Date;
    revenueSource?: string;
    description?: string;
    reference?: string;
    referenceId?: string;
    revenue?: number;
    transactionAmount?: number;
    tax?: number;
    discount?: number;
}

export interface ClubRevenueTransactionList {
    club?: ClubDataLite;
    startDate?: Date;
    endDate?: Date;
    totalRevenue?: number;
    totalTransactionAmount?: number;
    totalTax?: number;
    totalDiscounts?: number;
    revenueTransactions?: ClubRevenueTransaction[];
}

export interface ClubSalesForm {
    salesDate?: Date;
    salesTime?: Date;
    billNo?: string;
    remarks?: string;
    grossAmount?: number;
    discountAmount?: number;
    taxApplied?: number;
    netAmount?: number;
    salesMode?: SalesMode;
    posCode?: string;
    cashierId?: string;
    salesSource?: string;
}

export interface ClubSalesPaymentForm {
    paymentCode?: string;
    paymentReference?: string;
    paymentAmount?: number;
    paymentCurrency?: string;
    exchangeRate?: number;
    localAmount?: number;
    tipAmount?: number;
    localTipAmount?: number;
    changeAmount?: number;
    localChangeAmount?: number;
    cardName?: string;
}

export interface ClubStaff {
    id?: number;
    name?: string;
    designation?: string;
    staffId?: string;
    user?: UserAuthentication;
}

export interface ClubSupplementaryMembership {
    id?: number;
    primaryMembership?: ClubMembership;
    supplementaryMembership?: ClubMembership;
    relation?: string;
    billToPrimaryAccount?: boolean;
}

export interface CourseIndexSet {
    value?: number;
    name?: string;
    type?: string;
    indices?: number[];
    holeIndexSpec?: string;
}

export interface CourseRating {
    id?: number;
    name?: string;
    firstCourse?: ClubCourseData;
    secondCourse?: ClubCourseData;
    teeBox?: TeeBoxData;
    gender?: string;
    courseRating?: number;
    slopeRating?: number;
    groupName?: string;
}

export interface CourseTeeBoxData extends TeeBoxData {
    courseRating?: number;
    slopeRating?: number;
}

export interface EffectiveMemberCharge {
    chargeId?: string;
    chargeName?: string;
    description?: string;
    chargeType?: MemberChargeType;
    startDate?: Date;
    endDate?: Date;
    standardAmount?: number;
    chargedAmount?: number;
    recurring?: boolean;
    periodType?: RecurringChargerPeriod;
    periodLength?: number;
}

export interface IAvailableOnDay {
}

export interface MemberPaymentOption {
    schedulePaymentCheck?: boolean;
    paymentPeriod?: PeriodType;
    paymentPeriodLength?: number;
    firstReminderDays?: number;
    reminderOnEvery?: number;
    lastReminderBefore?: number;
    suspendOnPaymentDefault?: boolean;
    playerTypeOnSuspension?: string;
    gracePeriod?: PeriodType;
    gracePeriodLength?: number;
    deductFromDeposit?: boolean;
}

export interface MembershipJoiningExpiringStat {
    yearMonth?: string;
    monthName?: string;
    totalJoined?: number;
    totalExpired?: number;
}

export interface MembershipStat {
    totalMembers?: number;
    totalActive?: number;
totalInactive?: number;
    totalPending?: number;
    totalSuspended?: number;
    totalNew?: number;
totalExpired?: number;
    monthlyStats?: MembershipJoiningExpiringStat[];
}

export interface NearbyClub {
    location?: LocationData;
    club?: ClubData;
    distanceInKm?: number;
}

export interface OrderExtended extends Order {
    bookings?: Array<any>;
    clientId: string;
}

export interface Order {
    id?: number;
    club?: ClubData;
    clubLite?: ClubDataLite;
    orderNumber?: string;
    invoiceNumber?: string;
    orderDate?: Date;
    status?: OrderStatus;
    paymentStatus?: OrderPaymentStatus;
    orderAmount?: number;
    taxAmount?: number;
    discountGiven?: number;
    roundingAdj?: number;
    amountPayable?: number;
    refundAmount?: number;
    amountPaid?: number;
    orderCompletedAt?: Date;
    orderCancelledAt?: Date;
    createdBy?: UserAuthentication;
    cancelledBy?: UserAuthentication;
    taxProfile?: TaxProfile;
    taxProfileId?: string;
    orderUser?: UserAuthentication;
    partner?: DiscountCompany;
    clubCustomer?: ClubCustomer;
    player?: PlayerData | PlayerInfo;
    playerLite?: PlayerDataLite;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    customerGender?: string;
    orderType?: OrderType;
    orderPayments?: OrderPayment[];
    orderItems?: OrderItem[];
    refunds?: OrderRefund[];
    cartId?: string;
}

export interface OrderForm {
    orderDate?: Date;
    taxProfile?: string;
    playerId?: number;
    partnerId?: string;
    customerCode?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
    customerGender?: string;
}

export interface OrderItem {
    id?: number;
    priceComponent?: TeeTimePriceComponent;
    facilityBooking?: ClubFacilityBooking | ClubFacilityBookingLite; //| ClubFacilityBookingExtended; // ClubFacilityBookingLite;
    taxProfile?: TaxProfile;
    itemCount?: number;
    basePrice?: number;
    unitPrice?: number;
    price?: number;
    discountGiven?: number;
    taxAmount?: number;
    totalPrice?: number;
    itemReference?: string;
    description?: string;
    referenceDate?: Date;
    unitOfMeasure?: string;
    transactionId?: string;
    packageName?: string;
    editMode?: boolean;
    newPackageName?: string;
}

export interface OrderItemForm {
    componentId?: string;
    itemCount?: number;
    unitPrice?: number;
    discount?: number;
    description?: string;
    taxProfile?: string;
    packageName?: string;
}

export interface OrderLite {
    orderType?: OrderType;
    orderId?: number;
    orderNumber?: string;
    invoiceNumber?: string;
    orderDate?: Date;
    status?: OrderStatus;
    paymentStatus?: OrderPaymentStatus;
    orderAmount?: number;
    taxAmount?: number;
    discountGiven?: number;
    roundingAdj?: number;
    amountPayable?: number;
    amountPaid?: number;
}

export interface OrderPage extends PagedData<Order> {
}

export interface OrderPayment {
    id?: number;
    bill?: Bill;
    paymentHandledBy?: UserAuthentication;
    walletTransactionId?: number;
    playerAcctTrxnId?: number;
}

export interface OrderRefund {
    id?: number;
    refundMode?: RefundMode;
    refundAt?: Date;
    refundAmount?: number;
    playerRefunded?: PlayerData;
    clubCustomer?: ClubCustomer;
    refundProcessedBy?: UserAuthentication;
    refundReason?: string;
    description?: string;
    walletTopupId?: number;
    playerTrxnId?: number;
}

export interface PlayerAccountAgeing {
    ageingOn?: Date;
    playerId?: number;
    playerName?: string;
    ageing?: AgeingData;
}

export interface PlayerAccountAgeingPage extends PagedData<PlayerAccountAgeing> {
}

export interface PlayerAccountPaymentImport {
    id?: number;
    fileName?: string;
    documentUrl?: string;
    totalPayments?: number;
    totalSuccess?: number;
    totalErrors?: number;
    importedAt?: Date;
    importType?: string;
    user?: UserAuthentication;
    errors?: PlayerAccountTrxnImpError[];
}

export interface PlayerAccountPaymentImportPage extends PagedData<PlayerAccountPaymentImport> {
}

export interface PlayerAccountStat {
    player?: PlayerDataLite;
    yearMonth?: string;
    statementAmount?: number;
}

export interface PlayerAccountTrxnImpError {
    id?: number;
    lineSpec?: string;
    error?: string;
}
export interface PlayerBankCard {
    id?: number;
    name?: string;
    active?: boolean;
    autoDebit?: boolean;
    cardInfo?: BankCardInfo;
}

export interface PlayerBookingStat {
    totalBookings?: number;
    cancelledBookings?: number;
    bookingAmount?: number;
    cancelledBookingAmount?: number;
    payment?: number;
}

export interface PlayerBookingStats {
    player?: PlayerDataLite;
    membershipNumber?: string;
    overall?: PlayerBookingStat;
    monthly?: { [index: string]: PlayerBookingStat };
}

export interface PlayerClubStat {
    currentBalance?: number;
    monthly?: PlayerTransactionByMonth[];
    typeTotals?: { [index: string]: number };
    totalBookings?: number;
    activeBookings?: number;
    totalCompetitions?: number;
}
export interface PlayerTransactionByMonth {
    yearMonth?: string;
    monthName?: string;
    year?: number;
    amount?: number;
}
export interface PlayerClubAccount {
    id?: number;
    balanceAmount?: number;
    balanceType?: DebitOrCredit;
    allowCredit?: boolean;
    creditLimitApplicable?: boolean;
    creditLimit?: number;
    currency?: CurrencyData;
    club?: ClubData;
    player?: PlayerData;
    effectiveBalance?: number;
}

export interface PlayerClubAccountPage extends PagedData<PlayerClubAccount> {
}

export interface PlayerClubAccountStatement {
    id?: number;
    name?: string;
    statementDate?: Date;
    dueOn?: Date;
    includeTransactionUntil?: Date;
    balanceBroughtForward?: number;
    paymentReceived?: number;
    totalDebits?: number;
    totalCredits?: number;
    closingBalance?: number;
    currencyId?: string;
    currencySymbol?: string;
    approved?: boolean;
    createdAt?: Date;
    approvedAt?: Date;
    approvedBy?: UserAuthentication;
    club?: ClubData;
    player?: PlayerData;
    statementAmount?: number;
    statementOutstanding?: number;
    invoiceNumber?: string;
    ageing?: AgeingData;
    ageingAt?: Date;
    statementUrl?: string;
    transactions?: PlayerClubAccountTransaction[];
}

export interface PlayerClubAccountStatementPage extends PagedData<PlayerClubAccountStatement> {
}

export interface PlayerClubAccountTransaction {
    id?: number;
    transactionDate?: Date;
    status?: TransactionStatus;
    reference?: string;
    debitOrCredit?: DebitOrCredit;
    referenceDate?: Date;
    chargeType?: string;
    description?: string;
    amount?: number;
    createdAt?: Date;
    postedDate?: Date;
    reversedDate?: Date;
    playerClubAccount?: PlayerClubAccount;
    chargeByPlayer?: PlayerData;
    includedInStatement?: boolean;
    statementId?: number;
    statementDate?: Date;
    chargeContext?: string;
    chargeId?: string;
    chargeName?: string;
    transactionGenerated?: boolean;
    transactionId?: string;
    capturedBy?: UserAuthentication;
    importInstance?: number;
    exclude?: boolean;
    outletName?: string;
    outletId?: number;
    refundMode?: string;
    refundedBy?: any;
    expandMode?: boolean;
    reason?: string
}

export interface PlayerClubAccountTransactionPage extends PagedData<PlayerClubAccountTransaction> {
}

export interface PlayerCredit {
    player?: PlayerData;
    currency?: CurrencyData;
    balance?: number;
    walletBalance?: number;
}

export interface PlayerTransactionChargeTypes {
}

export interface PlayerVehicle {
    playerId?: number;
    playerName?: string;
    clubId?: number;
    clubName?: string;
    registrationNumber?: string;
    vehicleName?: string;
    yearOfModel?: number;
    parkingAllotted?: boolean;
    parkingSticker?: string;
    parkingBay?: string;
}

export interface PlayerVehicleForm {
    registrationNumber?: string;
    vehicleName?: string;
    yearOfModel?: number;
    parkingAllotted?: boolean;
    parkingSticker?: string;
    parkingBay?: string;
}

export interface PlayerVehiclePage extends PagedData<PlayerVehicle> {
}

export interface ProductPackage {
    id?: number;
    club?: ClubDataLite;
    name?: string;
    description?: string;
    logo?: string;
    packageItems?: ProductPackageItem[];
}

export interface ProductPackageItem {
    id?: number;
    pricingComponent?: TeeTimePriceComponent;
    defaultItemCount?: number;
}

export interface RefundFromClub {
    transactionDate?: Date;
    reference?: string;
    referenceDate?: Date;
    chargeType?: string;
    description?: string;
    amount?: number;
}

export interface ReminderOption {
    sendReminders?: boolean;
    firstReminderDays?: number;
    reminderOnEvery?: number;
    lastReminderBefore?: number;
    reminderScheduleRunsAt?: Date;
}

export interface Schedule {
    startDate?: Date;
    endDate?: Date;
    availabilities?: Availability[];
}

export interface TaxProfile {
    taxProfileId?: string;
    club?: ClubData;
    name?: string;
    taxNumber?: string;
    description?: string;
    taxAmountType?: AmountType;
    taxAmount?: number;
    active?: boolean;
    transactionType?: TransactionType;
}

export interface TaxProfileForm {
    taxProfileId?: string;
    name?: string;
    taxNumber?: string;
    description?: string;
    taxAmountType?: AmountType;
    taxAmount?: number;
    transactionType?: string;
}

export interface TaxProfilePage extends PagedData<TaxProfile> {
}

export interface TeeBoxData {
    id?: number;
    name?: string;
    image?: string;
    description?: string;
    teeBoxColor?: string;
}

export interface Unavailability {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    remarks?: string;
}

export interface AutoDebitResponse extends Record {
}

export interface Bank {
    id?: string;
    name?: string;
    address?: AddressData;
    country?: Country;
}

export interface ClubAutoDebitInstance {
    id?: number;
    instanceDate?: Date;
    fileSequence?: number;
    status?: string;
    club?: ClubData;
    bank?: Bank;
    totalTransactions?: number;
    totalAmount?: number;
    approvedTransactions?: number;
    approvedAmount?: number;
    rejectedTransactions?: number;
    rejectedAmount?: number;
    items?: ClubAutoDebitItem[];
}

export interface ClubAutoDebitItem {
    id?: number;
    debitDate?: Date;
    cardNumber?: string;
    amount?: number;
    currency?: string;
    expiryDate?: Date;
    transactionDescription?: string;
    primaryReference?: string;
    secondaryReference?: string;
    approvalType?: string;
    rejectReasonCode?: string;
    rejectReason?: string;
    accountId?: number;
}

export interface ClubBankSetup {
    id?: number;
    club?: ClubData;
    bank?: Bank;
    companyId?: string;
    merchantId?: string;
    fileNamePrefix?: string;
    autoDebit?: boolean;
    startFileSequence?: number;
    fileSequenceReset?: string;
}

export interface AdditionalItemCount {
    totalBalls?: number;
}

export interface BookableFacility {
    facilityId?: number;
    facilityName?: string;
    images?: string[];
    bookable?: boolean;
    locations?: BookableFacilityLocation[];
    facilityItems?: BookableFacilityItem[];
}

export interface BookableFacilityItem {
    id?: number;
    name?: string;
    images?: string[];
    slots?: BookableFacilitySlot[];
}

export interface BookableFacilityLocation {
    id?: number;
    name?: string;
    images?: string[];
    facilityItems?: BookableFacilityItem[];
}

export interface BookableFacilitySearchResult {
    resultAt?: Date;
    searchDate?: Date;
    outletType?: string;
    facilities?: BookableFacility[];
}

export interface BookableFacilitySlot {
    start?: Date;
    end?: Date;
    available?: boolean;
    reasonForUnavailability?: string;
    estimatedPrice?: number;
    playerTypeEstimation?: any; //{ [index: string]: number };
    bookingId?: number;
    bookingReference?: string;
    countSize?: number;
    countPrice?: number;
}

export interface BookingDuration {
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
}

export interface BookingPax {
    pax?: number;
    typePax?: any;//Array<any>;
    // typePax?: { [index: string]: number };
}

export interface ClubFacilityBooking {
    id?: number;
    bookingRequestedAt?: Date;
    bookingDate?: Date;
    bookingReference?: string;
    club?: ClubDataLite;
    facility?: OutletLite | ClubOutlet;
    facilityItem?: ClubFacilityItem;
    bookingPlayer?: PlayerDataLite;
    playerName?: string;
    playerEmail?: string;
    startTime?: Date;
    endTime?: Date;
    bookingDuration?: BookingDuration;
    pax?: BookingPax;
    additionalBookingCount?: AdditionalItemCount;
    bookingStatus?: FacilityBookingStatus;
    cartId?: string;
    order?: OrderLite;
    bookingCreatedBy?: UserDataLite;
    cancelledBy?: UserDataLite;
    taxProfile?: TaxProfile;
    amountPayable?: number;
    taxAmount?: number;
    totalAmount?: number;
    chargeDetail?: FacilityBookingChargeDetail;
    status?: FacilityBookingStatus;
    statusCheckDetail?: FacilityStatusCheckDetail;
}

export interface ClubFacilityBookingExtended extends ClubFacilityBookingLite {
    facility?: ClubOutlet;
    facilityItem?: ClubFacilityItem;
    editMode?: boolean;
    bookingStatus?: FacilityBookingStatus;
    order?: any;
}

export interface ClubFacilityBookingLite {
    id?: number;
    bookingDate?: Date;
    bookingReference?: string;
    outletId?: number;
    outletName?: string;
    outletType?: string;
    facilityItemId?: number;
    facilityItemName?: string;
    startTime?: Date;
    endTime?: Date;
    bookingDuration?: BookingDuration;
    pax?: BookingPax;
    orderId?: number;
    orderNumber?: string;
    invoiceNumber?: string;
    status?: FacilityBookingStatus;
    club?: ClubDataLite;
}

export interface ClubFacilityBookingPage extends PagedData<ClubFacilityBooking> {
}

export interface ClubFacilityItem {
    id?: number;
    name?: string;
    description?: string;
    facilityLocation?: ClubFacilityItemLocation;
    active?: boolean;
    minBookingDuration?: FacilityBookingDuration;
    facilityItemTiming?: FacilityTiming;
    pricingPlan?: FacilityPricing;
    images?: string[];
}

export interface ClubFacilityItemLocation {
    id?: number;
    name?: string;
    description?: string;
    active?: boolean;
    minBookingDuration?: FacilityBookingDuration;
    facilityLocationTiming?: FacilityTiming;
    pricingPlan?: FacilityPricing;
    images?: string[];
}

export interface FacilityBasePrice {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    dayId?: number;
    unitPrice?: FacilityUnitPrice;
    playerTypePrices?: FacilityPlayerTypePrice[];
}

export interface FacilityBookingChargeDetail {
    pricingId?: number;
    basePriceId?: number;
    durationUnits?: number;
    countUnits?: number;
    unitPriceUsed?: number;
    countPriceUsed?: number;
    countCharge?: number;
    playerTypeUnitPrice?: { [index: string]: number };
    playerTypeCharge?: { [index: string]: number };
}

export interface FacilityBookingDuration {
    durationUnit?: string;
    duration?: number;
}

export interface FacilityBookingRequest {
    facilityItemId?: number;
    bookingDate?: string;
    startTime?: Date;
    endTime?: Date;
    pax?: BookingPax;
    additionalCounts?: AdditionalItemCount;
    cartId?: string;
    playerName?: string;
    playerEmail?: string;
}

export interface FacilityBookingRules {
    finishOrderIn?: BookingDuration;
    paymentIn?: BookingDuration;
    depositAmount?: number;
    depositBefore?: BookingDuration;
    depositType?: AmountType;
    fullPaymentBefore?: BookingDuration;
}

export interface FacilityClosure {
    id?: number;
    closureStartDate?: string;
    closureEndDate?: string;
    wholeDay?: boolean;
    startTime?: string;
    endTime?: string;
    closureReason?: string;
    facility?: OutletLite; // ClubOutlet;
    facilityLocation?: ClubFacilityItemLocation;
    facilityItem?: ClubFacilityItem;
}

export interface FacilityClosurePage extends PagedData<FacilityClosure> {
}

export interface FacilityPlayerTypePrice {
    id?: number;
    playerType?: BookingPlayerType;
    unitPrice?: FacilityUnitPrice;
}

export interface FacilityPricing {
    id?: number;
    name?: string;
    description?: string;
    outletId?: number;
    outletName?: string;
    taxProfile?: TaxProfile;
    pricingUnit?: FacilityPricingUnit;
    unitPrice?: FacilityUnitPrice;
    basePrices?: FacilityBasePrice[];
}

export interface FacilityPricingForm extends FacilityUnitPriceForm {
    name?: string;
    description?: string;
    taxProfile?: string;
    pricingUnit?: FacilityPricingUnit;
    defaultPrice?: number;
    amPrice?: number;
    pmPrice?: number;
}

export interface FacilityPricingUnit {
    durationBased?: boolean;
    paxBased?: boolean;
    countBased?: boolean;
    durationUnit?: string;
    baseDurationSize?: number;
    countSize?: number;
}

export interface FacilityStatusCheckDetail {
    lastChecked?: Date;
    cancelledBySystem?: boolean;
    reason?: CancellationReason;
    cancellationDescription?: string;
    cancelledAt?: Date;
    lastNotificationSentAt?: Date;
}

export interface FacilityTiming {
    id?: number;
    defaultTiming?: FacilityWorkingHours;
    weekdayTiming?: FacilityWorkingHours;
    weekendTiming?: FacilityWorkingHours;
    publicHolidayTimings?: FacilityWorkingHours;
    closedOnDays?: string;
    closedOnPublicHolidays?: boolean;
}

export interface FacilityUnitPrice {
    unitPrice?: number;
    countPrice?: number;
    amUnitPrice?: number;
    amCountPrice?: number;
    pmUnitPrice?: number;
    pmCountPrice?: number;
    timeBasedPrices?: TimeBasedPrice[];
}

export interface FacilityUnitPriceForm {
    unitPrice?: number;
    countPrice?: number;
    amUnitPrice?: number;
    amCountPrice?: number;
    pmUnitPrice?: number;
    pmCountPrice?: number;
}

export interface FacilityWorkingHours {
    workingHours?: WorkingHourSpec;
    workingHourForDay?: { [index: string]: WorkingHourSpec };
}

export interface OutletLite {
    id?: number;
    name?: string;
    description?: string;
    outletType?: string;
    active?: boolean;
    images?: string[];
    bookableFacility?: boolean;
    displayToPublic?: boolean;
}

export interface TimeBasedPrice {
    timeRange?: TimeRange;
    unitPrice?: number;
    countPrice?: number;
}

export interface WorkingHourSpec {
    operatingHours?: TimeRange;
    closedBetween?: TimeRange[];
}

export interface AddPlayerRoundData {
    flightNo?: string;
    flightSequence?: number;
    teeOffTime?: Date;
    holeNo?: number;
    scorerId?: number;
    buggy?: string;
}

export interface CompRoundSessionData {
    id?: number;
    roundId?: number;
    roundNo?: number;
    startTime?: Date;
    maxSlots?: number;
    compPlayers?: PlayerDataLite[];
    teams?: TeamData[];
    // compPlayers?: CompetitionPlayerData[];
    registered?: number;
}

export interface CompetitionAdData {
    advertisement?: AdvertisementData;
    displayPeriod?: number;
    rank?: number;
}

export interface CompetitionCategory {
    sequence?: number;
    categoryId?: number;
    fixedCategory?: boolean;
    categoryName?: string;
    gender?: string;
    forGrouping?: boolean;
    fromHandicap?: number;
    toHandicap?: number;
}

export interface CompetitionCategoryData {
    id?: number;
    sequence?: number;
    playerCategory?: PlayerCategoryData;
    createdOn?: Date;
    fixedCategory?: boolean;
    createdBy?: string;
}

export interface CompetitionData {
    id?: number;
    competitionId?: number;
    name?: string;
    description?: string;
    image?: string;
    thumbnail?: string;
    startDate?: Date;
    endDate?: Date;
    publishDate?: Date;
    openDate?: Date;
    closeDate?: Date;
    fee?: number;
    totalPrize?: number;
    rules?: string;
    tieBreaker?: string;
    maxPlayers?: number;
    totalRegistered?: number;
    totalRounds?: number;
    totalHoles?: number;
    type?: string;
    multiplePrizes?: boolean;
    scoringFormat?: ScoringFormatData;
    scoringFormatPoints?: ScoringFormatPointData[];
    handicapFormat?: ScoringFormatData;
    peoriaHoles?: number[];
    teeBoxMen?: TeeBoxData;
    teeBoxWomen?: TeeBoxData;
    status?: string;
    derivedStatus?: string;
    sortOrder?: number;
    createdOn?: Date;
    createdBy?: string;
    allowGps?: boolean;
    considerScoreType?: string;
    autoStart?: number;
    autoStartCompetition?: boolean;
    maxMaleHandicap?: number;
    maxFemaleHandicap?: number;
    underParCap?: number;
    useInHandicap?: boolean;
    showLeaderBoard?: boolean;
    allowChangeScorer?: boolean;
    privateCompetition?: boolean;
    teamEvent?: boolean;
    downloadHandicap?: boolean;
    topNPlayersToConsider?: number;
    paymentMandatory?: boolean;
    paymentUrl?: string;
    handicapIndexPreference?: string;
    maintenanceByClubAllowed?: boolean;
    waitListSize?: number;
    waitListRules?: CompetitionWaitListRule;
    waitListQueueSize?: number;
    handicapSystems?: HandicapSystem[];
    club?: ClubData;
    organizer?: OrganizerData;
    invitation?: CompetitionInvitationData;
    gameRounds?: GameRoundData[];
    categories?: CompetitionCategoryData[];
    prizes?: CompetitionPrizeData[];
    sponsors?: CompetitionSponsorData[];
    scorerSetups?: CompetitionScorerSetup[];
    leagueSeasons?: LeagueSeason[];
    leagueSeasonNames?: string;
    leagueAndSeasons?: LeagueAndSeason[];
    players?: CompetitionPlayerData[];
    advertisements?: CompetitionAdData[];
    ocbs?: CompetitionOcbData[];
    invitees?: CompetitionInviteeData[];
    competitionTeams?: CompetitionTeamData[];
    waitLists?: CompetitionWaitList[];
    proCompetition?: boolean;
    externalLeaderboardUrl?: string;
    tournamentFee?: number;
    competitionCharge?: number;
    competitionRegistrationFee?: number;
    registrationFeeType?: AmountType;
}

export interface BuildFactory {
}

export interface CompetitionDataLite {
    id?: number;
    name?: string;
    description?: string;
    image?: string;
    thumbnail?: string;
    startDate?: Date;
    endDate?: Date;
    publishDate?: Date;
    openDate?: Date;
    closeDate?: Date;
    status?: string;
    derivedStatus?: string;
    sortOrder?: number;
    totalRounds?: number;
    maintenanceByClubAllowed?: boolean;
    scoringFormat?: string;
    handicapFormat?: string;
    clubId?: number;
    clubName?: string;
    clubImage?: string;
    organizerId?: number;
    organizerName?: string;
    organizerImage?: string;
    totalRegistered?: number;
    waitListSize?: number;
    waitListQueueSize?: number;
    registered?: boolean;
    waitlisted?: boolean;
}

export interface CompetitionDataLitePage extends PagedData<CompetitionDataLite> {
}

export interface CompetitionDataPage extends PagedData<MergedCompetitionDetails> {
}

export interface CompetitionDetails {
    nextRound?: number;
    roundInProgress?: number;
    paymentMandatory?: boolean;
    paymentUrl?: string;
    categories?: CompetitionCategory[];
    players?: CompetitionPlayerInfo[];
    prizes?: CompetitionPrizeInfo[];
    teamPrizes?: CompetitionPrizeInfo[];
    sponsors?: CompetitionSponsorInfo[];
    gameRounds?: GameRoundInfo[];
    totalNet?: number;
    totalGross?: number;
    netPosition?: number;
    grossPosition?: number;
    totalTeams?: number;
}

export interface CompetitionInfo {
    competitionId?: number;
    competitionName?: string;
    description?: string;
    allowGps?: boolean;
    showLeaderBoard?: boolean;
    allowChangeScorer?: boolean;
    considerTopN?: number;
    considerScoreType?: string;
    rules?: string;
    startDate?: Date;
    endDate?: Date;
    publishDate?: Date;
    openDate?: Date;
    closeDate?: Date;
    closedForRegistration?: boolean;
    status?: string;
    totalRounds?: number;
    imageUrl?: string;
    thumbnail?: string;
    type?: string;
    registered?: boolean;
    maxPlayers?: number;
    totalRegistered?: number;
    clubName?: string;
    clubId?: number;
    organizerId?: number;
    organizerName?: string;
    clubTag?: string;
    scoringFormat?: string;
    fee?: number;
    totalPrize?: number;
    totalHoles?: number;
    countryId?: string;
    countryName?: string;
    useInHandicap?: boolean;
    proCompetition?: boolean;
    externalLeaderboardUrl?: string;
    waitListSize?: number;
    totalWaitlisted?: number;
    waitlisted?: boolean;
    private?: boolean;
    teamEvent?: boolean;

}

export interface CompetitionInvitationData {
    subject?: string;
    body?: string;
    revokeSubject?: string;
    revokeBody?: string;
}

export interface CompetitionInviteeData {
    id?: number;
    email?: string;
    name?: string;
    player?: PlayerData;
    invitationSent?: boolean;
    invitationSentAt?: Date;
}

export interface CompetitionList extends PagedResult {
    competitions?: CompetitionInfo[];
}

export interface CompetitionOcb {
    id?: number;
    sequence?: number;
    ocb?: Ocb;
    name?: string;
    scoreType?: string;
    createdBy?: string;
    createdOn?: Date;
    highHandicap?: boolean;
    holes?: number[];
    rounds?: number[];
    playerIndexes?: number[];
}

export interface CompetitionOcbData {
    id?: number;
    roundInfo?: CompetitionRoundData;
    sequence?: number;
    ocb?: OcbData;
    details?: string;
    status?: string;
    scoreType?: string;
    ocbType?: string;
    createdBy?: string;
    createdOn?: Date;
}

export interface CompetitionPlayerData {
    id?: number;
    player?: PlayerData;
    category?: PlayerCategoryData;
    teeBox?: TeeBoxData;
    status?: CompetitionPlayerStatus;
    paymentMade?: boolean;
    paymentDate?: Date;
    paymentVia?: string;
    paymentRef?: string;
    paymentAmount?: number;
    nhsHandicap?: number;
    handicap?: number;
    handicapIndex?: number;
    netTotal?: number;
    grossTotal?: number;
    netPosition?: number;
    grossPosition?: number;
    createOn?: Date;
    createdBy?: string;
    handicapSource?: string;
    tshirtSizes?: string;
    useForHandicap?: boolean;
    ocbApplication?: OcbAppliedData;
    ocbCategoryApplication?: OcbAppliedData;
    clubMemberAccount?: string;
}

export interface CompetitionPlayerInfo {
    id?: number;
    playerId?: number;
    playerName?: string;
    firstName?: string;
    lastName?: string;
    handicap?: number;
    handicapIndex?: number;
    photoUrl?: string;
    categoryId?: number;
    category?: string;
    playerStatus?: CompetitionPlayerStatus;
    memberAccount?: string;
    countryId?: string;
    countryName?: string;
    sportCode?: string;
    flagUrl?: string;
    teeBox?: TeeBoxData;
    nationalityId?: string;
    nationalityName?: string;
    nationalFlag?: string;
    nationalSportCode?: string;
    useForHandicap?: boolean;
    netOcb?: string;
    grossOcb?: string;
    categoryNetOcb?: string;
    categoryGrossOcb?: string;
    absentRounds?: string;
}

export interface CompetitionPrizeData {
    id?: number;
    category?: PlayerCategoryData;
    roundInfo?: CompetitionRoundData;
    order?: number;
    prizePosition?: number;
    prize?: PrizeData;
    winnerData?: PrizeWinnerData;
    actualPosition?: number;
    actualPrizeAmount?: number;
}

export interface CompetitionPrizeInfo {
    categoryName?: string;
    categoryDisplaySequence?: number;
    prizeMoney?: number;
    title?: string;
    order?: number;
    prizePosition?: number;
    prizeName?: string;
    roundNumber?: number;
    scoreType?: string;
    teamPrize?: boolean;
    playerMon?: string;
    playerPos?: string;
    teamMon?: string;
    teamPos?: string;
    actualPosition?: number;
    actualPrizeAmount?: number;
}

export interface CompetitionRegisteredPlayers {
    totalRegistered?: number;
    totalWithdrawn?: number;
    totalNoShow?: number;
    totalDisqualified?: number;
    totalActive?: number;
    registeredPlayers?: CompetitionPlayerInfo[];
}

export interface CompetitionRoundCourseRatings {
    roundNo?: number;
    courseNames?: string[];
    courseIds?: number[];
    gender?: string;
    teeBox?: TeeBoxData;
    rating?: CourseSlopeRating;
    used?: boolean;
}

export interface CompetitionRoundData {
    roundId?: number;
    roundNo?: number;
    status?: GameRoundStatus;
    roundDate?: Date;
}

export interface CompetitionRoundSession {
    sessionId?: number;
    startTime?: Date;
    maxSlots?: number;
    allowJoinSession?: boolean;
    sessionPlayers?: PlayerDataLite[];
}

export interface CompetitionRounds {
    rounds?: CompetitionRoundData[];
}

export interface CompetitionScorecardKey {
    competitionId?: number;
    roundNo?: number;
}

export interface CompetitionScorecards {
    competitionName?: string;
    scoringFormat?: string;
    roundId?: number;
    roundNo?: number;
    playedOn?: Date;
    club?: ClubDataLite;
    organizerId?: number;
    organizerName?: string;
    playerScorecards?: PlayerScorecard[];
}

export interface CompetitionScorerSetup {
    roundNo?: number;
    scorerType?: CompetitionScorerType;
    scorerList?: number[];
    holeScorerMap?: HoleScorerMap;
}

export interface CompetitionSearchCriteria {
    searchType?: string;
    onlyParticipating?: boolean;
    searchWithinDistance?: boolean;
    maxDistance?: number;
    clubsWithMembership?: boolean;
    searchText?: string;
    periodLength?: number;
    periodType?: string;
}

export interface CompetitionSearchForm {
    playerId?: number;
    playerParticipation?: string;
    clubTypes?: string;
    status?: string;
    maxDistance?: number;
    longitude?: number;
    latitude?: number;
    countryId?: string;
    clubId?: number;
    organizerId?: number;
    startDate?: Date;
    endDate?: Date;
    search?: string;
}

export interface CompetitionSponsorData {
    id?: number;
    sponsorship?: string;
    status?: string;
    createdBy?: string;
    createdOn?: Date;
    image?: string;
    sponsorDate?: Date;
    sponsor?: SponsorData;
}

export interface CompetitionSponsorInfo {
    sponsor?: SponsorData;
    imageUrl?: string;
    sponsorDate?: Date;
    sponsorship?: string;
    status?: string;
}

export interface CompetitionStat {
    totalCompetitions?: number;
    totalCancelled?: number;
    totalCompleted?: number;
    totalUpcoming?: number;
    totalInProgress?: number;
    totalLatest?: number;
}

export interface CompetitionStatusData {
    competitionId?: number;
    competitionName?: string;
    description?: string;
    allowGps?: boolean;
    showLeaderBoard?: boolean;
    allowChangeScorer?: boolean;
    considerTopN?: number;
    considerScoreType?: string;
    rules?: string;
    startDate?: Date;
    endDate?: Date;
    publishDate?: Date;
    openDate?: Date;
    closeDate?: Date;
    closedForRegistration?: boolean;
    status?: string;
    totalRounds?: number;
    imageUrl?: string;
    thumbnail?: string;
    type?: string;
    registered?: boolean;
    maxPlayers?: number;
    totalRegistered?: number;
    clubName?: string;
    clubId?: number;
    organizerId?: number;
    organizerName?: string;
    clubTag?: string;
    scoringFormat?: string;
    fee?: number;
    totalPrize?: number;
    totalHoles?: number;
    autoStart?: number;
    private?: boolean;
    teamEvent?: boolean;
}

export interface CompetitionTeamData {
    id?: number;
    team?: TeamData;
    teamPositionNet?: number;
    teamPositionGross?: number;
    totalGross?: number;
    totalNet?: number;
    status?: string;
    onCountBackNet?: string;
    onCountBackGross?: string;
    onCountBackNetStat?: string;
    onCountBackGrossStat?: string;
    teamPlayers?: CompetitionTeamPlayerData[];
}

export interface CompetitionTeamPlayerData {
    id?: number;
    captain?: boolean;
    considered?: boolean;
    competitionPlayer?: CompetitionPlayerData;
}

export interface CompetitionWaitList {
    id?: number;
    player?: PlayerData;
    waitListedOn?: Date;
    status?: WaitListStatus;
    registeredOn?: Date;
    automaticallyRegistered?: boolean;
    registeredBy?: UserAuthentication;
}

export interface CompetitionWaitListRule {
    autoAddMembers?: boolean;
    autoAddGuests?: boolean;
    preferMembers?: boolean;
    autoRegisterMembers?: boolean;
    autoRegisterGuests?: boolean;
}

export interface FinalizationData {
    playerRoundId?: number;
    player?: PlayerDataLite;
    scorer?: PlayerDataLite;
    flightNo?: string;
    holesScored?: number;
    status?: PlayerRoundStatus;
    totalGross?: number;
}

export interface FlightGenerationOption {
    competition?: number;
    playerOrderBy?: string;
ascending?: boolean;
    genderSeparation?: boolean;
    flightSize?: number;
    startTime?: string;
    minsApart?: number;
    flightType?: FlightType;
    retainGroups?: boolean;
    cutoffRounds?: number[];
    beyond18Holes?: number[];
    advanceType?: PlayerAdvanceType;
    cutOffScore?: number;
    topNPlayers?: number;
    scoreToUse?: string;
    playersPerBuggy?: number;
    scorerType?: ScorerType;
    scorerSwapType?: ScorerSwapType;
    swapBuggyScorer?: number;
    buggyTypes?: string[];
    maxSameTeamPlayers?: number;
    flightTeam?: boolean;
}

export interface FlightInfo {
    flightNumber?: string;
    startTime?: Date;
    startHole?: number;
    groupName?: string;
    playerFlight?: boolean;
    flightMembers?: FlightMember[];
}

export interface FlightMember {
    flightSequence?: number;
    playerId?: number;
    playerName?: string;
    photoUrl?: string;
    handicap?: number;
    buggy?: string;
    status?: PlayerRoundStatus;
    scorer?: boolean;
    playerCount?: number;
    scoringPlayerId?: number;
    scoringPlayerName?: string;
    teeBox?: TeeBoxData;
}

export interface GameRoundCourseUpdate {
    whichNine?: number;
    courseId?: number;
    indexSet?: number;
}

export interface HoleScorerMap {
    masterScorers?: number[];
    holeMap?: { [index: string]: number[] };
}


export interface LeaderBoard {
    competionName?: string;
    competitionName?: string;
    firstNineCourseName?: string;
    secondNineCourseName?: string;
    totalPages?: number;
    currentPage?: number;
    totalInPage?: number;
    success?: boolean;
    errorMessage?: string;
    players?: LeaderBoardPlayer[];
}

export interface LeaderBoardPlayer {
    presenceStatus?: number;
    statusName?: string;
    position?: string;
    competitionPlayerId?: number;
    compStatus?: CompetitionPlayerStatus;
    playerRoundStatus?: PlayerRoundStatus;
    playerId?: number;
    gender?: string;
    playerName?: string;
    firstName?: string;
    imageURL?: string;
    handicap?: number;
    handicapIndex?: number;
    categoryName?: string;
    categoryId?: number;
    parCap?: number;
    round1Gross?: number;
    round2Gross?: number;
    round3Gross?: number;
    round4Gross?: number;
    round1Net?: number;
    round2Net?: number;
    round3Net?: number;
    round4Net?: number;
    round1ModifiedNet?: number;
    round2ModifiedNet?: number;
    round3ModifiedNet?: number;
    round4ModifiedNet?: number;
    round1Points?: number;
    round2Points?: number;
    round3Points?: number;
    round4Points?: number;
    outTotalGross?: number;
    inTotalGross?: number;
    totalGross?: number;
    actualTotalGross?: number;
    outTotalNet?: number;
    inTotalNet?: number;
    totalNet?: number;
    outTotalPoints?: number;
    inTotalPoints?: number;
    totalPoints?: number;
    actualTotalNet?: number;
    totalNetAdj?: number;
    modifiedTotalNet?: number;
    onHole?: string;
    thru?: string;
    ocb?: string;
    netPosition?: number;
    grossPosition?: number;
    toPar?: number;
    toParGross?: number;
    toParNet?: number;
    grossOcbStat?: string;
    categoryGrossOcbStat?: string;
    netOcbStat?: string;
    categoryNetOcbStat?: string;
    startTime?: Date;
    countryId?: string;
    sportCode?: string;
    flagUrl?: string;
    roundsAbsent?: { [index: string]: CompetitionPlayerStatus };
    lastName?: string;
}

export interface LeaderBoardPlayers {
    competitionName?: string;
    scoringFormatName?: string;
    handicapFormatName?: string;
    players?: LeaderboardCompPlayer[];
}

export interface LeaderBoardTeam {
    teamId?: number;
    position?: string;
    teamName?: string;
    imageURL?: string;
    handicap?: number;
    toPar?: number;
    parCap?: number;
    totalGross?: number;
    totalNet?: number;
    modifiedTotalNet?: number;
    onHole?: string;
}

export interface LeaderboardCompPlayer {
    status?: string;
    playerId?: number;
    compPlayerId?: number;
    totalGross?: number;
    totalNet?: number;
    totalPoints?: number;
    positionGross?: number;
    positionNet?: number;
    ocbStatGross?: string;
    ocbStatNet?: string;
    categoryOcbStatGross?: string;
    categoryOcbStatNet?: string;
}

export interface LeaderboardKey {
    compId?: number;
    roundNo?: number;
    category?: number;
    scoreType?: string;
}

export interface LeaderboardRound {
    roundNo?: number;
    players?: LeaderboardRoundPlayer[];
}

export interface LeaderboardRoundPlayer {
    competitionPlayerId?: number;
    compPlayerStatus?: CompetitionPlayerStatus;
    category?: number;
    playerRoundId?: number;
    playerId?: number;
    gender?: string;
    playerName?: string;
    firstName?: string;
    imageURL?: string;
    handicap?: number;
    countryId?: string;
    sportCode?: string;
    flagUrl?: string;
    status?: PlayerRoundStatus;
    outGross?: number;
    inGross?: number;
    totalGross?: number;
    outNet?: number;
    inNet?: number;
    totalNet?: number;
    modifiedTotalNet?: number;
    outPoints?: number;
    inPoints?: number;
    totalPoints?: number;
    parCap?: number;
    grossPosition?: number;
    grossOcbStat?: string;
    categoryGrossOcbStat?: string;
    netPosition?: number;
    netOcbStat?: string;
    categoryNetOcbStat?: string;
    toParGross?: number;
    toParNet?: number;
    lastName?: string;
}

export interface LeagueAndSeason {
    leagueName?: string;
    seasonName?: string;
}

export interface Ocb {
    id?: number;
    name?: string;
    type?: OcbType;
    teamEvent?: boolean;
    active?: boolean;
}

export interface OcbAppliedData {
    ocbGross?: boolean;
    ocbGrossDetails?: string;
    ocbNet?: boolean;
    ocbNetDetails?: string;
}

export interface OcbData {
    id?: number;
    name?: string;
    details?: string;
    status?: string;
    ocbType?: string;
    createdBy?: string;
    createdOn?: Date;
}

export interface PlayerCategoryData {
    id?: number;
    name?: string;
    displaySequence?: number;
    forGrouping?: boolean;
    fromHandicap?: number;
    toHandicap?: number;
    gender?: string;
    organizer?: OrganizerData;
}

export interface PlayerScoreInfo {
    playerRoundId?: number;
    playerId?: number;
    playerName?: string;
    flightNumber?: string;
    startingHole?: number;
    buggyNumber?: string;
    scorerId?: number;
    scorerName?: string;
    holesPlayed?: number;
    netScore?: number;
    grossScore?: number;
    submitted?: boolean;
    withdrawn?: boolean;
    lastHoleScored?: number;
    currentHole?: number;
    scores?: { [index: string]: number };
}

export interface PrizeData {
    title?: string;
    prizeName?: string;
    scoreType?: string;
    teamPrize?: boolean;
    prizeMoney?: number;
}

export interface PrizeWinnerData {
    playerWinnerPos?: PlayerData;
    playerWinnerMon?: PlayerData;
    teamWinnerPos?: TeamData;
    teamWinnerMon?: TeamData;
}

export interface ScorerSetupForm {
    scorerType?: CompetitionScorerType;
    scorers?: number[];
    holeScorerMap?: HoleScorerMap;
}

export interface ScoringFormatData {
    id?: number;
    name?: string;
    adjustmentFactor?: number;
    usedFor?: string;
    pointBased?: boolean;
    usedForHandicap?: boolean;
    description?: string;
    createdOn?: Date;
    createdBy?: string;
    scoringFormatPoints?: ScoringFormatPointData[];
}

export interface ScoringFormatPointData {
    id?: number;
    name?: string;
    pointScore?: number;
    pointValue?: number;
    peoriaHoles?: number[];
}

export interface TeamData {
    id?: number;
    name?: string;
    logo?: string;
    description?: string;
    teamCaptain?: PlayerData;
    club?: ClubData;
    teamMembers?: PlayerData[];
}

export interface TeamDataPage extends PagedData<TeamData> {
}

export interface TeamInfo {
    teamId?: number;
    teamName?: string;
    description?: string;
    teamLogo?: string;
    playerTeam?: boolean;
    captainName?: string;
    teamPlayers?: TeamPlayerInfo[];
}

export interface TeamList extends PagedResult {
    competitionTeams?: TeamInfo[];
}

export interface TeamPlayerInfo {
    teamPlayerId?: number;
    teamPlayerName?: string;
    handicap?: number;
    status?: string;
    imageURL?: string;
    thumbnailURL?: string;
    gender?: string;
}

export interface UserCompetitionScoringPlan {
    selfScoring?: boolean;
    scoreAllPlayers?: boolean;
    holes?: number[];
    scoreAllHoles?: boolean;
    players?: number[];
    holePlayerMap?: { [index: string]: number[] };
}

export interface CompetitionMonthlyCount {
    year?: number;
    month?: number;
    status?: string;
    count?: number;
}

export interface CompetitionStat {
    totalCompetitions?: number;
    totalCancelled?: number;
    totalCompleted?: number;
    totalUpcoming?: number;
    totalInProgress?: number;
    totalLatest?: number;
}

export interface AppInfo {
    packageName?: string;
    versionNumber?: string;
    versionCode?: string;
    appName?: string;
}

export interface CompetitionDeviceLock {
    competitionId?: number;
    roundNumber?: number;
    scorerId?: number;
    flightNumber?: string;
    deviceId?: string;
    lockTime?: Date;
    deviceName?: string;
    batteryLevel?: number;
}

export interface DeviceAssignment {
    competitionId?: number;
    roundNumber?: number;
    scorerId?: number;
    deviceId?: string;
    deviceName?: string;
    userTags?: string;
}

export interface DeviceInfo {
    deviceId?: string;
    deviceName?: string;
    virtual?: boolean;
    cordovaVersion?: string;
    platform?: string;
    platformVersion?: string;
    model?: string;
    manufacturer?: string;
    serial?: string;
    userTags?: string;
    ownedBy?: number;
    batterLevel?: number;
    lastActive?: Date;
    favorite?: boolean;
}

export interface DeviceList extends PagedResult {
    deviceList?: DeviceInfo[];
}

export interface DevicePage extends PagedData<DeviceInfo> {
}

export interface BookingAgentClubSetting {
    id?: number;
    discountCompany?: DiscountCompany;
    clubData?: ClubDataLite;
    active?: boolean;
    maxBookingsPerDay?: number;
    maxUnpaidBookings?: number;
    allowCredit?: boolean;
    creditLimit?: number;
    balance?: number;
    bookingCommissionType?: AmountType;
    bookingCommission?: number;
    allowBookingUnopenedSlots?: boolean;
    paymentRules?: BookingAgentPaymentRules;
    commissionComponents?: string[];
}

export interface BookingAgentClubSettingPage extends PagedData<BookingAgentClubSetting> {
}

export interface BookingAgentCommission {
    id?: number;
    clubId?: number;
    clubName?: string;
    partnerId?: string;
    partnerName?: string;
    bookingReference?: string;
    playerCharge?: number;
    agentCharge?: number;
    commission?: number;
    commissionDetails?: BookingAgentCommissionDetails;
    status?: string;
    cancelReason?: string;
    teeTimeBookingId?: number;
    teeOffDate?: Date;
    teeOffTime?: Date;
}

export interface BookingAgentCommissionDetails {
    calculationMethod?: string;
    playerCharge?: number;
    pricingPlan?: number;
    agentCharge?: number;
    agentPricingPlan?: number;
    percentage?: number;
}

export interface BookingAgentPaymentRules {
    paymentIn?: BookingDuration;
    depositBefore?: BookingDuration;
    depositType?: AmountType;
    depositAmount?: number;
    fullPaymentBefore?: BookingDuration;
}

export interface BookingAgentPmtDistribution {
    id?: number;
    transactionId?: number;
    transactionDate?: Date;
    transactionAmount?: number;
    amountPaid?: number;
}

export interface BookingAgentPricingPlan {
    id?: number;
    setting?: BookingAgentClubSetting;
    startDate?: Date;
    endDate?: Date;
    dayId?: DayIdType;
    amPm?: string;
    pricingClubToAgent?: TeeTimePricingPlan;
    pricingAgentToPlayer?: TeeTimePricingPlan;
}

export interface BookingAgentPricingPlanForm {
    startDate?: Date;
    endDate?: Date;
    dayId?: DayIdType;
    amPm?: string;
    clubToAgent?: number;
    agentToPlayer?: number;
}

export interface BookingAgentSettingForm {
    active?: boolean;
    maxBookingsPerDay?: number;
    maxUnpaidBookings?: number;
    allowCredit?: boolean;
    creditLimit?: number;
    balance?: number;
    bookingCommissionType?: AmountType;
    bookingCommission?: number;
    allowBookingUnopenedSlots?: boolean;
}

export interface BookingAgentStatement {
    id?: number;
    statementDate?: Date;
    transactionsUntil?: Date;
    openingBalance?: number;
    totalDebit?: number;
    totalCredits?: number;
    totalPayments?: number;
    closingBalance?: number;
    outstandingBalance?: number;
    paymentMade?: number;
    status?: BookingAgentStatementStatus;
    approvedOn?: Date;
    statementReference?: string;
    club?: ClubData;
    bookingAgent?: DiscountCompany;
    transactions?: BookingAgentTransaction[];
    statementPayments?: BookingAgentPmtDistribution[];
}

export interface BookingAgentStatementPage extends PagedData<BookingAgentStatement> {
}

export interface BookingAgentTransaction {
    id?: number;
    discountCompany?: DiscountCompany;
    clubData?: ClubData;
    transactionDate?: Date;
    transactionFor?: string;
    transactionReference?: string;
    debitOrCredit?: DebitOrCredit;
    amount?: number;
    commissionType?: AmountType;
    commissionAmount?: number;
    transactionType?: BookingAgentTransactionType;
    transactionCreatedAt?: Date;
    remarks?: string;
    createdBy?: UserAuthentication;
    statementId?: number;
}

export interface BookingAgentTransactionPage extends PagedData<BookingAgentTransaction> {
}

export interface BookingDiscountProfile extends Record {
}

export interface BookingValidation {
    allowBooking?: boolean;
    reason?: string;
    maxBookingsPerDay?: number;
    currentBookingsPerDay?: number;
    maxUnpaidBookings?: number;
    currentUnpaidBookings?: number;
}

export interface DiscountAudit {
    discountsByPlayer?: DiscountByPlayer[];
}

export interface DiscountByPlayer {
    bookingPlayerId?: number;
    playerId?: number;
    playerName?: string;
    discounts?: DiscountByPricingComponent[];
}

export interface DiscountByPricingComponent {
    pricingComponent?: string;
    amount?: number;
    discount?: number;
}

export interface DiscountCompany {
    id?: string;
    name?: string;
    description?: string;
    partnerImage?: string;
    emailList?: string;
    partnerServices?: PartnerService[];
    nationalGolfAssociation?: boolean;
    country?: CountryData;
    address?: AddressData;
    organizer?: OrganizerData;
    discountPrograms?: DiscountCompanyProgram[];
}

export interface DiscountCompanyForm extends AddressForm {
    id?: string;
    name?: string;
    description?: string;
    partnerServices?: PartnerService[];
    partnerImage?: MultipartFile;
    emailList?: string;
}

export interface DiscountCompanyPage extends PagedData<DiscountCompany> {
}

export interface DiscountCompanyProgram {
    id?: string;
    name?: string;
    discountCompany?: DiscountCompany;
    description?: any;
    launchedOn?: Date;
    validFrom?: Date;
    validUntil?: Date;
    amountType?: AmountType;
    validityMonths?: number;
    discountAmount?: number;
    includesInsurance?: boolean;
    insuranceValidityMonths?: number;
    autoApprove?: boolean;
    includesHandicap?: boolean;
    includesDiscount?: boolean;
}

export interface DiscountCompanyProgramPage extends PagedData<DiscountCompanyProgram> {
}

export interface DiscountPlayerClub {
    playerDiscountProgram?: PlayerDiscountProgram;
    club?: ClubData;
    teeTimeDiscount?: TeeTimeDiscount;
    verified?: boolean;
    approved?: boolean;
    validFrom?: Date;
    validUntil?: Date;
    dateApplied?: Date;
    dateApproved?: Date;
    approvedBy?: UserAuthentication;
}

export interface DiscountProgramMember {
    programId?: string;
    playerName?: string;
    email?: string;
    gender?: string;
    phone?: string;
    membershipNo?: string;
    nhsNumber?: string;
    validFrom?: Date;
    validUntil?: Date;
    nationality?: string;
    handicapIndex?: number;
    validFromStr?: string;
    validUntilStr?: string;
    sheetIdx?: number;
    rowIdx?: number;
}

export interface DiscountRateByComp {
    pricingComponent?: string;
    amPrice?: number;
    amPriceNineHoles?: number;
    pmPrice?: number;
    pmPriceNineHoles?: number;
}

export interface PartnerProgramMemberLoadData extends DiscountProgramMember {
    insuranceName?: string;
    insuranceNumber?: string;
    insuranceFrom?: Date;
    insuranceUntil?: Date;
}

export interface PartnerProgramMembershipApplication {
    id?: number;
    partnerProgram?: DiscountCompanyProgram;
    player?: PlayerData;
    applicationDate?: Date;
    newApplication?: boolean;
    currentMembershipNumber?: string;
    nhsNumber?: string;
    insuranceNumber?: string;
    salutation?: string;
    fullName?: string;
    gender?: string;
    dateOfBirth?: Date;
    govtDocumentNumber?: string;
    armyPoliceId?: string;
    mobileNo?: string;
    email?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    postalCode?: string;
    stateProvince?: string;
    fax?: string;
    website?: string;
    nationality?: CountryData;
    paid?: boolean;
    bill?: Bill;
    approved?: boolean;
    approvedBy?: UserAuthentication;
    approvedAt?: Date;
}

export interface PartnerProgramMembershipApplicationPage extends PagedData<PartnerProgramMembershipApplication> {
}

export interface PlayerDiscountApprovalSpec {
    clubId?: number;
    applications?: PlayerDiscountProgramApplication[];
}

export interface PlayerDiscountClubApproval {
    playerDiscountProgram?: PlayerDiscountProgram;
    club?: ClubData;
    approved?: boolean;
    validFrom?: Date;
    validUntil?: Date;
    dateApplied?: Date;
    dateApproved?: Date;
    approvedBy?: UserAuthentication;
}

export interface PlayerDiscountProgram {
    id?: number;
    discountProgram?: DiscountCompanyProgram;
    player?: PlayerData;
    verifiedByCompany?: boolean;
    verifiedOn?: Date;
    validFrom?: Date;
    validUntil?: Date;
    membershipNumber?: string;
    nhsNumber?: string;
    insuranceNumber?: string;
    document?: string;
    applicationCreated?: PartnerProgramMembershipApplication;
    applicationRenewed?: PartnerProgramMembershipApplication;
}

export interface PlayerDiscountProgramApplication {
    playerId?: number;
    programId?: string;
    validFrom?: Date;
    validUntil?: Date;
}

export interface PlayerDiscountProgramPage extends PagedData<PlayerDiscountProgram> {
}

export interface TeeTimeClubVoucher {
    id?: number;
    seriesId?: number;
    voucherNumber?: string;
    name?: string;
    validFrom?: Date;
    playerAssigned?: PlayerData;
    assignedOn?: Date;
    validUntil?: Date;
    redeemed?: boolean;
    redeemedOn?: Date;
    club?: ClubData;
    assignedBy?: UserAuthentication;
    transferable?: boolean;
    usableWithOtherRewards?: boolean;
    appliesToBookingAmount?: boolean;
    appliesToFlight?: boolean;
    voucherAmountType?: AmountType;
    voucherAmount?: number;
    allowOnWeekdays?: boolean;
    allowOnWeekends?: boolean;
    allowOnPublicHolidays?: boolean;
    initialPlayerAssigned?: PlayerData;
    previousPlayerAssigned?: PlayerData;
    assignedTo?: string;
    remarks?: string;
    priceComponents?: TeeTimePriceComponent[];
    assigned?: boolean;
}

export interface TeeTimeClubVoucherPage extends PagedData<TeeTimeClubVoucher> {
}

export interface TeeTimeClubVoucherSeries {
    id?: number;
    club?: ClubData;
    voucherSeries?: string;
    name?: string;
    description?: string;
    transferable?: boolean;
    usableWithOtherRewards?: boolean;
    appliesToBookingAmount?: boolean;
    appliesToFlight?: boolean;
    voucherAmountType?: AmountType;
    voucherAmount?: number;
    allowOnWeekdays?: boolean;
    allowOnWeekends?: boolean;
    allowOnPublicHolidays?: boolean;
    totalVouchers?: number;
    validityDays?: number;
    vouchersIssued?: number;
    createdBy?: UserAuthentication;
    voucherImage?: string;
    validFrom?: Date;
    validUntil?: Date;
    includesTax?: boolean;
    taxPercent?: number;
    applyBeforeTax?: boolean;
    maxFlightSize?: number;
    maxVouchersPerPlayer?: number;
    dynamicAmount?: boolean;
    voucherType?: VoucherType;
    voucherAllowedIn?: VoucherAllowedIn;
    applicableIn?: VoucherApplicableIn[];
    priceComps?: TeeTimeVoucherPriceComp[];
    applicableDaysStr?: string;
    maxValidDays?: number;
}

export interface TeeTimeDiscount {
    id?: number;
    name?: string;
    description?: string;
    validFrom?: Date;
    validUntil?: Date;
    amountType?: AmountType;
    discount?: number;
    appliesToBooking?: boolean;
    active?: boolean;
    autoApply?: boolean;
    availableForClubOnly?: boolean;
    usableWithOtherRewards?: boolean;
    discountBeforeTax?: boolean;
    disableForJumboFlight?: boolean;
    applicableRate?: TeeTimeDiscountRate;
    club?: ClubData;
    discountProgram?: DiscountCompanyProgram;
    priceComponents?: TeeTimePriceCompDiscount[];
    playerTypes?: TeeTimePlayerTypeDiscount[];
    discountRates?: TeeTimeDiscountRate[];
}

export interface TeeTimeDiscountPage extends PagedData<TeeTimeDiscount> {
}

export interface TeeTimeDiscountRate {
    id?: number;
    dayId?: number;
    dayName?: string;
    amRateType?: AmountType;
    amRate?: number;
    amRateNineHole?: number;
    pmRateType?: AmountType;
    pmRate?: number;
    pmRateNineHole?: number;
    taxable?: boolean;
    includesTax?: boolean;
    taxPercent?: number;
    excludeNegativeFromTax?: boolean;
    discountRateByComps?: DiscountRateByComp[];
}

export interface TeeTimePlayerTypeDiscount {
    id?: number;
    bookingPlayerType?: BookingPlayerType;
}

export interface TeeTimePriceCompDiscount {
    id?: number;
    priceComponent?: TeeTimePriceComponent;
}

export interface TeeTimeVoucherPriceComp {
    id?: number;
    priceComponent?: TeeTimePriceComponent;
    price?: number;
}

export interface VoucherSeriesPage extends PagedData<TeeTimeClubVoucherSeries> {
}

export interface EmailAddress {
    email?: string;
    name?: string;
}

export interface EmailAttachment {
    attachment?: any;
    name?: string;
    contentType?: string;
}

export interface EmailMessage {
    subject?: string;
    message?: string;
    copyBritesoft?: string;
    from?: EmailAddress;
    toList?: EmailAddress[];
    ccList?: EmailAddress[];
    bccList?: EmailAddress[];
    attachments?: EmailAttachment[];
}

export interface EmailMessageForm {
    playerName?: string;
    toList?: string;
    ccList?: string;
    bccList?: string;
    subject?: string;
    body?: string;
}

export interface EmailSendInfo {
}

export interface EmailSentReport {
    messageId?: string;
    currentStatus?: EmailStatus;
    lastTriedAt?: Date;
    failedCount?: number;
    sentAt?: Date;
}

export interface ExcelFlight {
    flightNumber?: string;
    gameCourseId?: number;
    courseName?: string;
    startTime?: Date;
    startingHole?: number;
    startRowIndex?: number;
    endRowIndex?: number;
    members?: ExcelFlightMember[];
}

export interface ExcelFlightCourse {
    gameCourseId?: number;
    courseName?: string;
}

export interface ExcelFlightData {
    competitionId?: number;
    clubId?: number;
    roundNumber?: number;
    workbook?: any;
    categories?: ExcelPlayerCategory[];
    courses?: ExcelFlightCourse[];
    flights?: ExcelFlight[];
}

export interface ExcelFlightMember {
    rowIndex?: number;
    playerName?: string;
    email?: string;
    phone?: string;
    buggy?: string;
    nhsNumber?: string;
    clubMembership?: string;
    handicap?: number;
    scorerName?: string;
    categoryId?: number;
    categoryName?: string;
    gender?: string;
    playerId?: number;
    playerRecord?: any;
    scorer?: any;
    countryId?: string;
    nationality?: string;
}

export interface ExcelFlightSaveInfo {
    error?: boolean;
    errorMessages?: string[];
    currentPlayerRounds?: any[];
    createCompetitionPlayers?: any[];
    createPlayerRounds?: any[];
    updatePlayerRounds?: any[];
    deletePlayerRounds?: any[];
}

export interface ExcelFlightSaveStatus {
    loading?: boolean;
    currentMessge?: string;
    messages?: string[];
    error?: boolean;
    errorCellStyle?: any;
    errorMessages?: string[];
}

export interface ExcelPlayerCategory {
    categoryId?: number;
    categoryName?: string;
}

export interface ClubExternalInterface {
    clubId?: number;
    clubName?: string;
    system?: ExternalSystem;
    authenticationDetails?: string;
    connection?: OAuth2Connection;
    basicAuthentication?: BasicAuthentication;
    generateExport?: boolean;
    syncDirection?: SyncDirection;
    currencyMappings?: CurrencyMapping[];
    apiBaseUrl?: string;
    importFinancials?: boolean;
    exportFinancials?: boolean;
    startDate?: Date;
    exportScheduledAt?: Date;
}

export interface ClubExternalInterfacePage extends PagedData<ClubExternalInterface> {
}

export interface CurrencyMapping {
    currencyCode?: string;
    externalCurrencyCode?: string;
}

export interface ExternalCurrency {
    id?: string;
    code?: string;
    name?: string;
}

export interface ExternalInterfaceForm {
    generateExport?: boolean;
    exportScheduledAt?: Date;
    apiBaseUrl?: string;
    importFinancials?: boolean;
    exportFinancials?: boolean;
}

export interface ExternalSystem {
    id?: string;
    name?: string;
    description?: string;
    systemType?: string;
    authenticationPolicy?: string;
}

export interface FnbProduct {
    code?: string;
    name?: string;
    description?: string;
    category?: string;
    category2?: string;
    unitPrice?: number;
    productImage?: string;
}

export interface FnbSales {
    posId?: string;
    billNo?: string;
    bizDate?: Date;
    salesMode?: string;
    referenceNo?: string;
    returnBillNo?: string;
    currCode?: string;
    grossAmount?: number;
    discountAmount?: number;
    netAmount?: number;
    remarks?: string;
}

export interface ClubFeatureSubscription extends FeatureSubscription {
    club?: ClubData;
}

export interface ClubFeatureSubscriptionPage extends PagedData<ClubFeatureSubscription> {
}

export interface FeatureSubscription {
    id?: number;
    active?: boolean;
    underGracePeriod?: boolean;
    feature?: PremiumFeature;
    quantityBought?: number;
    unlimited?: boolean;
    subscription?: boolean;
    subscriptionType?: SubscriptionType;
    boughtOn?: Date;
    startDate?: Date;
    endDate?: Date;
    graceDays?: number;
    quantityUsed?: number;
}

export interface PlayerFeatureSubscription extends FeatureSubscription {
    player?: PlayerData;
}

export interface PlayerFeatureSubscriptionPage extends PagedData<PlayerFeatureSubscription> {
}

export interface PremiumFeature {
    id?: string;
    name?: string;
    availableToPlayers?: boolean;
    availableToClubs?: boolean;
    availableToOrganizers?: boolean;
    description?: string;
    basePeriod?: BasePeriod;
}

export interface PremiumFeatureBundle {
    id?: number;
    name?: string;
    bundleSize?: number;
    bundlePeriod?: number;
    unlimited?: boolean;
    prices?: PremiumFeaturePrice[];
}

export interface PremiumFeaturePrice {
    id?: number;
    country?: string;
    currency?: string;
    startDate?: Date;
    endDate?: Date;
    price?: number;
    pricingType?: FeatureBundlePriceType;
    tiers?: { [index: string]: number };
}

export interface Feedback {
    id?: number;
    category?: FeedbackCategory;
    fromEmail?: string;
    toEmail?: string;
    subject?: string;
    message?: string;
    status?: string;
    messageSent?: Date;
    fromUser?: number;
    toUser?: number;
}

export interface FeedbackCategory {
    id?: string;
    name?: string;
    displayOrder?: number;
}

export interface DayAndTimeSpecification {
    availability?: { [index: string]: TimeRange[] };
}

export interface FnbOutlet {
    outletCode?: string;
    outletName?: string;
    outletMapping?: string;
    description?: string;
    externalSystem?: ExternalSystem;
    syncTransactions?: boolean;
    operatingTimings?: DayAndTimeSpecification;
    authDetails?: string;
}

export interface FnbOutletProduct {
    outlet?: FnbOutlet;
    product?: Product;
    available?: boolean;
    availability?: DayAndTimeSpecification;
    unitPrice?: number;
    availableForBuggy?: boolean;
}

export interface Product {
    group?: ProductGroup;
    productId?: string;
    name?: string;
    description?: string;
    available?: boolean;
    availability?: DayAndTimeSpecification;
    unitPrice?: number;
    availableForBuggy?: boolean;
    allowParcel?: boolean;
}

export interface ProductCategory {
    id?: string;
    name?: string;
    description?: string;
    available?: boolean;
}

export interface ProductGroup {
    category?: ProductCategory;
    id?: string;
    name?: string;
    description?: string;
    available?: boolean;
}

export interface AddressForm {
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    fax?: string;
    phoneNumbers?: string[];
    website?: string;
    email?: string;
    country?: string;
    primaryPhone?: string;
    phone1?: string;
    phone2?: string;
}


export interface GameCourseForm {
    whichNine?: number;
    name?: string;
    courseId?: number;
    courseIndexSet?: number;
}

export interface PlayerImportForm {
    clubId?: number;
    fileToImport?: MultipartFile;
}

export interface PlayerRegistrationForm extends RegistrationForm {
    nhsNo?: string;
    handicapSystem?: string;
    mg2uIndex?: number;
    teeBoxName?: string;
}

export interface ProfileForm {
    salutation?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: Date;
    maritalStatus?: MaritalStatus;
    marriageDate?: Date;
    nationality?: string;
    religion?: string;
    race?: string;
    occupation?: string;
    phoneNumber?: string;
    staffId?: string;
    designation?: string;
    photo?: MultipartFile;
}

export interface RegistrationForm extends ProfileForm {
    email?: string;
    loginName?: string;
    password?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    fax?: string;
    phoneNumbers?: string[];
    website?: string;
    country?: string;
}

export interface SponsorForm extends AddressForm {
    name?: string;
    status?: string;
    registerNo?: string;
    contactEmail?: string;
    contactPerson?: string;
    description?: string;
    dateJoined?: Date;
    image?: MultipartFile;
}

export interface BuggyForm {
    buggyType?: string;
    buggyNo?: string;
    name?: string;
    properties?: string;
    physicalId?: string;
    dateStart?: Date;
    maintenanceDate?: Date;
    seater?: number;
    make?: string;
    model?: string;
    status?: string;
    buggyQCode?: string;
    description?: string;
    priority?: number;
    availability?: boolean[];
    buggyImage?: MultipartFile;
    buggyDate?: BuggyData;
}

export interface BuggyTypeForm {
    typeId?: string;
    typeName?: string;
    description?: string;
    maxSeats?: number;
    assignmentRequired?: boolean;
    maxShifts?: number;
    minMinutesBetweenShifts?: number;
    assignableTo?: string[];
    pricingComponent?: string;
    singleSeatComponent?: string;
}

export interface CaddieRegistrationForm {
    nickName?: string;
    identificationNo?: string;
    staffId?: string;
    dateJoined?: Date;
    grade?: number;
    qcode?: string;
    description?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: Date;
    status?: string;
    nationality?: string;
    availability?: boolean[];
    photo?: MultipartFile;
}

export interface ClubBankForm extends AddressForm {
    name?: string;
    branch?: string;
    accountNo?: string;
    beneficiary?: string;
    swiftCode?: string;
    referenceNo?: string;
    routingNo?: string;
    primaryAccount?: boolean;
}

export interface ClubCourseForm {
    name?: string;
    displayOrder?: number;
    totalHoles?: number;
    coursePar?: number;
    description?: string;
    shortCode?: string;
    courseRating?: number;
    slopeRating?: number;
    courseImage?: MultipartFile;
}

export interface ClubCreateForm extends AddressForm {
    name?: string;
    clubTag?: string;
    timeZone?: string;
    virtualClub?: boolean;
    clubType?: any;
    contactPerson?: string;
    contactEmail?: string;
    amenities?: string;
    clubLogo?: MultipartFile;
    clubImage?: MultipartFile;
}

export interface ClubEditForm extends ClubCreateForm {
    registerNo?: string;
    clubTag?: string;
    clubDescription?: string;
    gpsLatitude?: number;
    gpsLongitude?: number;
    handicapSystem?: string;
    timezone?: string;
    bookingReferencePrefix?: string;
}

export interface ClubFacilityForm {
    id?: string;
    name?: string;
    description?: string;
    active?: boolean;
    image?: MultipartFile;
}

export interface ClubMemberForm extends RegistrationForm {
    nhsNo?: string;
    handicapSystem?: string;
    mg2uIndex?: number;
    teeBoxName?: string;
    membershipNo?: string;
    membershipType?: string;
    dateJoined?: Date;
    dateExpired?: Date;
}

export interface ClubMembershipChargeForm {
    chargeId?: string;
    name?: string;
    description?: string;
    amount?: number;
    recurringCharge?: boolean;
    periodType?: RecurringChargerPeriod;
    periodLength?: number;
    transactionType?: string;
    active?: boolean;
    optionalCharge?: boolean;
    firstTransactionDate?: Date;
    applicableTo?: MembershipChargeApplicableTo;
    applyOnRenewal?: boolean;
}

export interface ClubMembershipForm extends EInvoicingEntityForm {
    membershipNo?: string;
    membershipType?: string;
    joinedOn?: Date;
    validUntil?: Date;
    depositAmountPaid?: number;
    statementEmail?: boolean;
    correspondenceEmail?: string;
    memberImage?: MultipartFile;
    homeClub?: boolean;
    preventAutoSuspension?: boolean;
    passport?: string;
    icNumber?: string;
    legalName?: string;
    phoneNumber?: string;
    einvoicingOption?: EInvoicingOption;
}

export interface ClubMembershipTypeForm {
    typeId?: string;
    typeName?: string;
    allowSupplementary?: boolean;
    bookingPlayerType?: string;
    introduction?: boolean;
    maxMembers?: number;
    membersCanIntroduce?: boolean;
    maximumIntroduction?: number;
    maxGuests?: number;
    termsAndConditions?: string;
    term?: boolean;
}

export interface ClubRegistrationForm extends AddressForm {
    name?: string;
    shortName?: string;
    virtualClub?: boolean;
    handicapSystem?: string;
    timezone?: string;
    clubLogo?: MultipartFile;
    gender?: string;
    firstName?: string;
    lastName?: string;
    contactEmail?: string;
    representativePhone?: string;
    password?: string;
    representativePhoto?: MultipartFile;
    organizer?: boolean;
    membership?: boolean;
    membershipBilling?: boolean;
}

export interface ClubStaffForm extends RegistrationForm {
}

export interface CourseHoleForm {
    holeNo?: number;
    holePar?: number;
    holeIndexOut?: number;
    holeIndexIn?: number;
    latitude?: number;
    longitude?: number;
    teeBoxDistances?: string[];
    description?: string;
    holeImage?: MultipartFile;
}

export interface CourseRatingForm {
    name?: string;
    firstCourse?: number;
    secondCourse?: number;
    teeBoxName?: string;
    gender?: string;
    courseRating?: number;
    slopeRating?: number;
}

export interface MembershipUpdateForm {
    membershipNo?: string;
    membershipType?: string;
    dateJoined?: Date;
    dateExpired?: Date;
    homeClub?: boolean;
}

export interface UnavailabilityForm {
    startDate?: Date;
    endDate?: Date;
    remarks?: string;
}

export interface CompetitionCopyForm {
    playerCategories?: boolean;
    ocbs?: boolean;
    prizes?: boolean;
    sponsors?: boolean;
    players?: boolean;
}

export interface CompetitionForm {
    clubId?: number;
    organizerId?: number;
    name?: string;
    type?: string;
    privateTournament?: boolean;
    proCompetition?: boolean;
    teamEvent?: boolean;
    maxPlayers?: number;
    startDate?: Date;
    endDate?: Date;
    publishDate?: Date;
    openDate?: Date;
    closeDate?: Date;
    totalRounds?: number;
    showLeaderBoard?: boolean;
    allowChangeScorer?: boolean;
    allowGps?: boolean;
    useInHandicap?: boolean;
    totalPrizeAmount?: number;
    allowMultiplePrizes?: boolean;
    description?: string;
    rules?: string;
    tieBreaker?: string;
    considerScoreType?: string;
    underParCap?: number;
    scoringFormat?: number;
    handicapFormat?: number;
    peoriaHoles?: number[];
    teeBoxForMen?: string;
    teeBoxForWomen?: string;
    maxHandicapMen?: number;
    maxHandicapWomen?: number;
    paymentMandatory?: boolean;
    tournamentFee?: number;
    competitionCharge?: number;
    competitionRegistrationFee?: number;
    registrationFeeType?: AmountType;
    handicapPreference?: string[];
    downloadHandicap?: boolean;
    autoStart?: boolean;
    autoStartBefore?: number;
    logo?: MultipartFile;
    maintenanceByClubAllowed?: boolean;
    waitListSize?: number;
}

export interface CompetitionOcbForm {
    ocbId?: number;
    sequence?: number;
    ocbDetail?: string;
}

export interface CompetitionPrizeForm {
    position?: number;
    title?: string;
    prizes?: string;
    monetaryValue?: number;
    winningPlayerId?: number;
    order?: number;
}

export interface CompetitionRoundForm {
    roundNo?: number;
    roundDate?: Date;
    name?: string;
    description?: string;
    deriveHandicap?: boolean;
    totalNines?: number;
    courses?: GameCourseForm[];
    sessions?: CompetitionRoundSession[];
}

export interface CompetitionRoundSessionForm {
    sessionId?: number;
    startTime?: Date;
    maxSlots?: number;
    allowJoinSession?: boolean;
}

export interface CompetitionSponsorForm {
    sponsorId?: number;
    sponsorship?: string;
    sponsorDate?: Date;
    status?: string;
    image?: MultipartFile;
}

export interface OcbForm {
    name?: string;
    details?: string;
    ocbType?: string;
    status?: string;
}

export interface PlayerCategoryForm {
    name?: string;
    displaySequence?: number;
    forGrouping?: boolean;
    fromHandicap?: number;
    toHandicap?: number;
    gender?: string;
}

export interface TeamForm {
    name?: string;
    description?: string;
    captain?: number;
    teamLogo?: MultipartFile;
}

export interface DiscProgMemRegForm {
    verified?: boolean;
    verifiedOn?: Date;
    validFrom?: Date;
    validUntil?: Date;
    membershipNumber?: string;
    document?: MultipartFile;
}

export interface DiscountProgramForm {
    id?: string;
    name?: string;
    description?: string;
    launchedOn?: Date;
    validFrom?: Date;
    validUntil?: Date;
    amountType?: AmountType;
    amount?: number;
    autoApprove?: boolean;
    validityMonths?: number;
    includesHandicap?: boolean;
    includesInsurance?: boolean;
    includedDiscount?: boolean;
    insuranceValidityMonths?: number;
}

export interface PackagePriceForm {
    priceComponent?: string;
    price?: number;
}

export interface PlayerAndDiscMemRegForm extends PlayerRegistrationForm {
    verified?: boolean;
    verifiedOn?: Date;
    validFrom?: Date;
    validUntil?: Date;
    membershipNumber?: string;
    document?: MultipartFile;
}

export interface TeeTimeDiscountForm {
    name?: string;
    discountProgram?: string;
    description?: string;
    discountType?: AmountType;
    discountAmount?: number;
    validFrom?: Date;
    validUntil?: Date;
    appliesToBooking?: boolean;
    autoApply?: boolean;
    availableForClubOnly?: boolean;
    usableWithOtherRewards?: boolean;
    discountBeforeTax?: boolean;
    applicablePricingComponents?: string[];
    applicablePlayerTypes?: string[];
}

export interface TeeTimeDiscountRateComponentForm {
    pricingComponent?: string;
    amRate9Holes?: number;
    amRate18Holes?: number;
    pmRate9Holes?: number;
    pmRate18Holes?: number;
}

export interface TeeTimeDiscountRateForm {
    dayId?: number;
    rateType?: AmountType;
    amRate9Holes?: number;
    amRate18Holes?: number;
    pmRate9Holes?: number;
    pmRate18Holes?: number;
    taxable?: boolean;
    includesTax?: boolean;
    taxPercent?: number;
    componentPrices?: TeeTimeDiscountRateComponentForm[];
}

export interface TeeTimeVoucherSeriesForm {
    name?: string;
    voucherSeries?: string;
    description?: string;
    amountType?: AmountType;
    amount?: number;
    totalVouchers?: number;
    validityDays?: number;
    validFrom?: Date;
    validUntil?: Date;
    transferable?: boolean;
    includeTax?: boolean;
    taxPercent?: number;
    voucherImage?: MultipartFile;
    appliesToBookingAmount?: boolean;
    appliesToFlight?: boolean;
    applyBeforeTax?: boolean;
    maxFlightSize?: number;
    usableWithOtherRewards?: boolean;
    allowOnWeekdays?: boolean;
    allowOnWeekends?: boolean;
    allowOnPublicHolidays?: boolean;
    maxVouchersPerPlayer?: number;
    dynamicAmount?: boolean;
    voucherType?: VoucherType;
    allowedIn?: VoucherAllowedIn;
    applicableIn?: VoucherApplicableIn[];
}

export interface FeatureBundlePriceForm {
    currency?: string;
    priceType?: FeatureBundlePriceType;
    price?: number;
    startDate?: Date;
    endDate?: Date;
}

export interface MygolfCommissionRateForm {
    commissionType?: AmountType;
    commission?: number;
    commissionTypeForClubPayment?: AmountType;
    commissionForClubPayment?: number;
    onCancelCommissionType?: AmountType;
    onCancelCommission?: number;
    minCommissionAmount?: number;
    maxCommissionAmount?: number;
    taxAmountType?: AmountType;
    taxAmount?: number;
    calculateByPlayer?: boolean;
    commissionBeforeTax?: boolean;
}

export interface MygolfPlayerTypeCommissionForm {
    commissionType?: AmountType;
    commission?: number;
    commissionTypeForClubPayment?: AmountType;
    commissionForClubPayment?: number;
}

export interface PricingComponentForm {
    name?: string;
    description?: string;
    systemSeeded?: boolean;
    printSequence?: number;
    componentType?: PricingComponentType;
}

export interface PricingPlanAdditionalChargeForm {
    name?: string;
    amountType?: AmountType;
    amount?: number;
    printSequence?: number;
    applicablePricingComponents?: string[];
    applicablePlayerTypes?: string[];
}

export interface PricingPlanForm {
    name?: string;
    description?: string;
    currency?: string;
    promotional?: boolean;
    allowDiscounts?: boolean;
    useVisitorOnAll?: boolean;
    targetType?: TargetType;
}

export interface SlotGenerationRuleForm {
    name?: string;
    daysInAdvanceToGenerate?: number;
    daysInAdvanceToOpen?: number;
    published?: boolean;
}

export interface SlotGenerationSpecificationForm {
    startTime?: Date;
    gapInMinutes?: number;
    slotsToGenerate?: number;
}

export interface SlotRuleDayForm {
    displaySequence?: number;
    name?: string;
    holiday?: boolean;
    bookingDisabled?: boolean;
    minPlayersPerSlot?: number;
    maxPlayersPerSlot?: number;
    buggyMandatory?: boolean;
    maxPlayersPerBuggy?: number;
    caddieMandatory?: boolean;
    maxPlayersPerCaddie?: number;
    pricingPlan?: number;
    promotionalPricingPlan?: number;
    specialDayName?: string;
}

export interface TeeTimePriceForm {
    pricingComponent?: string;
    appliesTo?: any;
    mandatory?: boolean;
    addToDisplayPrice?: boolean;
    nineHolePrice?: number;
    eighteenHolePrice?: number;
    packageName?: string;
}

export interface TeeTimeSlotForm {
    minPlayers?: number;
    maxPlayers?: number;
    waitingListSize?: number;
    availableForBooking?: boolean;
    membersOnly?: boolean;
    reasonForBlocking?: string;
    pricingPlan?: number;
    pricingPlanPromotional?: number;
    pricingPlanJumbo?: number;
    buggyMandatory?: boolean;
    maxPlayersPerBuggy?: number;
    caddyMandatory?: boolean;
    maxPlayersPerCaddy?: number;
    maxPlayersPerBuggyJumbo?: number;
    maxPlayersPerCaddyJumbo?: number;
    nineHolesAllowed?: boolean;
    eighteenHolesAllowed?: boolean;
}

export interface TransactionTypeForm {
    id?: string;
    name?: string;
    debitOrCredit?: string;
    description?: string;
    transactionGroup?: string;
    clubTransactionType?: string;
    debitAccountCode?: string;
    creditAccountCode?: string;
    usedFor?: TransactionTypeUsedFor;
}

export interface CourseHole {
    holeNumber?: number;
    courseHoleId?: number;
    parScore?: number;
    holeIndex?: number;
    blueDistance?: number;
    blackDistance?: number;
    redDistance?: number;
    latitude?: number;
    longitude?: number;
}

export interface GameCourse {
    whichNine?: number;
    courseId?: number;
    courseName?: string;
    clubId?: number;
    clubName?: string;
    coursePar?: number;
    courseHoles?: CourseHole[];
    totalHoles?: number;
}

export interface NormalGameRound {
    clientId?: string;
    clubInfo?: ClubInfo;
    warning?: string;
    playersInGame?: PlayerInGame[];
    gameCourses?: CourseInfo[];
    gameRoundId?: number;
    totalHoles?: number;
}

export interface PlayerInGame {
    playerInfo?: PlayerInfo;
    playerRoundId?: number;
    scores?: PlayerScore[];
}

export interface ClubHandicap {
    clubInfo?: ClubInfo;
    handicapSystem?: HandicapSystem;
    course1?: string;
    course2?: string;
    rating?: CourseSlopeRating;
    handicapIndex?: number;
    handicap?: number;
    homeClub?: boolean;
}

export interface CompetitionHandicapIndex {
    handciapIndex?: number;
    rating?: CourseSlopeRating;
    handicap?: number;
    derivedFrom?: string;
}

export interface CourseHandicapDetails {
    handicapSystem?: string;
    handicapIndex?: number;
    handicapIndexDate?: Date;
    teeBoxName?: string;
    handicap?: number;
    rating?: CourseSlopeRating;
    nineHoleHandicap?: boolean;
    handicapIndexEstablished?: boolean;
}

export interface CourseSlopeRating {
    courseRating?: number;
    slopeRating?: number;
    totalPar?: number;
}

export interface ExceptionScoreReduction {
    scoreRelativeToHidx?: number;
    extraAdjustment?: number;
}

export interface HandicapCalculation {
    id?: number;
    handicapSystem?: string;
    handicapSystemId?: string;
    handicapIndexDate?: Date;
    calculatedOn?: Date;
    player?: PlayerDataLite;
    totalRoundsRead?: number;
    totalRoundsUsed?: number;
    totalAverageDifferentialsUsed?: number;
    averageValue?: number;
    handicapFactor?: number;
    nineHoleHandicap?: boolean;
    lowHandicapStartDate?: Date;
    lowHandicapEndDate?: Date;
    lowHandicapIndex?: number;
    initialHandicapIndex?: number;
    handicapIndexAfterSoftCap?: number;
    handicapIndexMovement?: number;
    handicapIndexAfterHardCap?: number;
    handicapIndex?: number;
    gameRounds?: HandicapGameRound[];
}

export interface HandicapCalculationPage extends PagedData<HandicapCalculation> {
}

export interface HandicapGameRound {
    playerRoundId?: number;
    nineHoles?: boolean;
    clubName?: string;
    clubId?: number;
    roundDate?: Date;
    startTime?: Date;
    totalHolesPlayed?: number;
    courseRating?: number;
    slopeRating?: number;
    totalPar?: number;
    competitionRound?: boolean;
    competitionId?: number;
    roundNo?: number;
    competitionName?: string;
    courses?: string;
    courseHandicap?: number;
    courseNames?: string[];
    rating?: CourseSlopeRating;
    handicapIndex?: number;
    teeBoxId?: number;
    teeBoxName?: string;
    scores?: HandicapScore[];
    sortGroup?: number;
    totalActualGrossScore?: number;
    totalGrossScore?: number;
    totalAdjustedScore?: number;
    averageDifferential?: number;
    pccAdjustment?: number;
    scoreDifferential?: number;
    esr?: number;
    cumulativeESR?: number;
    used?: boolean;
}

export interface HandicapIndex {
    handicapSystem?: string;
    handicapIndexDate?: Date;
    index?: number;
    established?: boolean;
}

export interface HandicapScore {
    holeNo?: number;
    holePar?: number;
    holeIndex?: number;
    actualGrossScore?: number;
    grossScore?: number;
    adjustedScore?: number;
    strokesAllowed?: number;
    holePlayed?: boolean;
}

export interface HandicapSystem {
    id?: string;
    name?: string;
    shortCode?: string;
    description?: string;
    defaultSystem?: boolean;
    derivedByMygolf?: boolean;
    logoUrl?: string;
}

export interface HandicapSystemConfig {
    maxRounds?: number;
    minRounds?: number;
    considerNineHoleScores?: boolean;
    minHolesForNine?: number;
    minHolesForEighteen?: number;
    scoreDifferentials?: ScoreDifferentialCount[];
    minCompetitiveScores?: number;
    minimumRoundsForLowestHandicapIndex?: number;
    lowestHandicapIndexPeriod?: Period;
    applySoftCap?: boolean;
    softCap?: number;
    softCapSuppression?: number;
    applyHardCap?: boolean;
    hardCap?: number;
    applyExceptionalScoreReduction?: boolean;
    exceptionalScoreReductions?: ExceptionScoreReduction[];
}

export interface PlayerHandicapIndex {
    handicapSystemId?: string;
    handicapSystemName?: string;
    player?: PlayerDataLite;
    handicapIndexDate?: Date;
    handicapIndex?: number;
}

export interface PlayerHandicapIndexRecord extends Record {
}

export interface ScoreDifferentialCount {
    numberOfDifferentials?: number;
    numberOfDifferentialsToUse?: number;
    adjustment?: number;
}

export interface EclecticPlayerRound {
    id?: number;
    position?: number;
    participating?: boolean;
    playerId?: number;
    playerName?: string;
    photo?: string;
    teeBoxName?: string;
    flightNo?: string;
    roundNo?: number;
    handicapIndex?: number;
    handicap?: number;
    handicapDecimal?: number;
    courseRating?: number;
    slopeRating?: number;
    totalGrossOut?: number;
    totalGrossIn?: number;
    totalGross?: number;
    totalNetOut?: number;
    totalNetIn?: number;
    totalNet?: number;
    actualTotalGross?: number;
    actualTotalNet?: number;
    totalNetAdj?: number;
    playerScores?: EclecticPlayerScore[];
}

export interface EclecticPlayerScore {
    eprId?: number;
    holeNo?: number;
    holePar?: number;
    holeIndex?: number;
    grossScore?: number;
    netScore?: number;
    actualGrossScore?: number;
    actualNetScore?: number;
}

export interface LeaderBoardPositionPoint {
    startPosition?: number;
    endPosition?: number;
    points?: number;
    guestsPercent?: number;
    newPlayersPercent?: number;
}

export interface League {
    id?: number;
    name?: string;
    description?: string;
    organizer?: OrganizerData;
    leagueType?: LeagueType;
    leagueImage?: string;
    seasonCount?: number;
}

export interface LeagueCompetitionPlayerTotal {
    id?: number;
    roundNo?: number;
    roundDate?: Date;
    handicap?: number;
    totalGross?: number;
    totalNet?: number;
    totalStablefordPoints?: number;
    prizeMoney?: number;
    leaderBoardPosition?: number;
    positionalPoints?: number;
    actualPositionalPoints?: number;
    participationPoints?: number;
    additionalPoints?: number;
    competition?: CompetitionDataLite;
    player?: PlayerData | PlayerDataLite;
}

export interface LeagueForm {
    name?: string;
    description?: string;
    leagueType?: LeagueType;
    leagueImage?: MultipartFile;
}

export interface LeagueLeaderboard {
    leagueRound?: LeagueRound;
    leagueSeason?: LeagueSeason;
    playerRounds?: EclecticPlayerRound[];
}

export interface LeaguePlayerTotal {
    id?: number;
    totalGross?: number;
    totalNet?: number;
    totalStablefordPoints?: number;
    totalPrizeMoney?: number;
    totalPositionalPoints?: number;
    totalActualPositionalPoints?: number;
    totalParticipationPoints?: number;
    totalAdditionalPoints?: number;
    leaguePosition?: number;
  totalLeaguePoints?: number;
    originalLeaguePosition?: number;
    grossPosition?: number;
    netPosition?: number;
    stablefordPointsPosition?: number;
  positionalPosition?: number;
    leagueTotals?: LeagueTotals;
    prizeMoneyPosition?: number;
    player?: PlayerData | PlayerDataLite;
}

export interface LeagueRoster {
    id?: number;
    newMember?: boolean;
    player?: PlayerData | PlayerDataLite;
    memberOfOrganizer?: boolean;
    membershipNumber?: string;
}

export interface LeagueRound {
    seasonName?: string;
    roundNo?: number;
    roundDate?: Date;
    competitionId?: number;
    competitionName?: string;
    status?: string;
}

export interface LeagueRoundDetails {
    holePars?: number[];
    holeIndexes?: number[];
}

export interface LeagueScorecards {
    leagueRound?: LeagueRound;
    leagueRoundDetails?: LeagueRoundDetails;
    playerRounds?: EclecticPlayerRound[];
}

export interface LeagueSeason {
    league?: League;
    id?: number;
    seasonName?: string;
    startDate?: Date;
    endDate?: Date;
    leagueType?: LeagueType;
    status?: LeagueSeasonStatus;
    roundsForLowestGross?: number;
    bestOf?: number;
    leagueSettings?: LeagueSettings;
    competitionCount?: number;
    seasonCompetitions?: LeagueSeasonCompetition[];
    rosterCount?: number;
}

export interface LeagueSeasonCompetition {
    id?: number;
    competitionSequence?: number;
    competition?: CompetitionData;
}

export interface LeagueSeasonForm {
    seasonName?: string;
    startDate?: Date;
    endDate?: Date;
    leagueType?: LeagueType;
    roundsForLowestGross?: number;
    bestOf?: number;
    settings?: LeagueSettings;
}

export interface LeagueSeasonPage extends PagedData<LeagueSeason> {
}

export interface LeagueSettings {
    minimumParticipation?: number;
    bestOf?: number;
    ignoreGuests?: boolean;
    autoAddMembers?: boolean;
    leaderBoardPositionPoints?: LeaderBoardPositionPoint[];
    autoDetectNewPlayers?: boolean;
    newPlayerAfterGames?: number;
    participationPoints?: number;
}

export interface LeagueTotals {
    totalParticipation?: number;
    totalGross?: number;
    totalNet?: number;
    totalStablefordPoints?: number;
    totalPrizeMoney?: number;
    totalPositionalPoints?: number;
    totalActualPositionalPoints?: number;
    totalParticipationPoints?: number;
    totalAdditionalPoints?: number;
}

export interface LowestAverageGrossLeaderboard {
    leagueSeason?: string;
    totalRounds?: number;
    totalFinished?: number;
    leagueRounds?: LeagueRound[];
    players?: PlayerLowestAverageGross[];
}

export interface PlayerGrossScoreByRound {
    playerId?: number;
    roundNo?: number;
    roundDate?: Date;
    status?: string;
    totalGross?: number;
    considered?: boolean;
}

export interface PlayerLowestAverageGross {
    position?: number;
    playerId?: number;
    playerName?: string;
    photo?: string;
    teeBoxName?: string;
    teeBoxImage?: string;
    qualifyingRounds?: number;
    averageGross?: number;
    eligible?: boolean;
    scoresByRound?: PlayerGrossScoreByRound[];
}

export interface OrganizerAdData {
    advertisement?: AdvertisementData;
    startDate?: Date;
    endDate?: Date;
    displayPeriod?: number;
    rank?: number;
    autoInclude?: boolean;
}

export interface OrganizerData {
    id?: number;
    registerNo?: string;
    name?: string;
    shortName?: string;
    description?: string;
    address?: AddressData;
    image?: string;
    contactPerson?: string;
    contactEmail?: string;
    status?: string;
    dateJoined?: Date;
    createdOn?: Date;
    createdBy?: string;
    club?: ClubDataLite;
    partner?: DiscountCompany;
    country?: CountryData;
    advertisements?: OrganizerAdData[];
}

export interface OrganizerDataPage extends PagedData<OrganizerData> {
}

export interface OrganizerInviteeSet {
    id?: number;
    name?: string;
    updatedBy?: string;
    updatedOn?: Date;
    members?: OrganizerInviteeSetMember[];
}

export interface OrganizerInviteeSetMember {
    id?: number;
    email?: string;
    name?: string;
    player?: PlayerData;
}

export interface OrganizerMember {
    organizerId?: number;
    clubId?: number;
    partnerId?: string;
    partnerProgramId?: string;
    membershipNo?: string;
    player?: PlayerDataLite;
}

export interface OrganizerMemberPage extends PagedData<OrganizerMember> {
}


export interface PaymentGatewayInfo {
    id?: string;
    type?: string;
    name?: string;
    description?: string;
    country_id?: string;
    currency_id?: string;
    http_server?: string;
    api_key?: string;
    x_signature?: string;
    merchant_code?: string;
    merchant_key?: string;
    callback_url?: string;
    redirect_url?: string;
    payment_url?: string;
    internal_payment_url?: string;
    signature_algorithm?: string;
    signature_format?: string;
}

export interface PaymentMethod {
    id?: string;
    name?: string;
}

export interface PaymentMethods {
}

export interface PlayerBookingTypeAssociation {
    bookingPlayerType?: BookingPlayerType;
    supportingDocument?: string;
}

export interface PlayerClubStat {
    currentBalance?: number;
    monthly?: PlayerTransactionByMonth[];
    typeTotals?: { [index: string]: number };
    totalBookings?: number;
    activeBookings?: number;
    totalCompetitions?: number;
}
export interface PlayerClubAccount {
    id?: number;
    club?: ClubData;
    player?: PlayerData;
    currency?: CurrencyData;
    balanceAmount?: number;
    balanceType?: DebitOrCredit;
    allowCredit?: boolean;
    creditLimitApplicable?: boolean;
    creditLimit?: number;
}

export interface PaymentGatewayInfo {
    id?: string;
    type?: string;
    name?: string;
    description?: string;
    country_id?: string;
    currency_id?: string;
    http_server?: string;
    api_key?: string;
    x_signature?: string;
    merchant_code?: string;
    merchant_key?: string;
    callback_url?: string;
    redirect_url?: string;
    payment_url?: string;
    internal_payment_url?: string;
    signature_algorithm?: string;
    signature_format?: string;
}

export interface PaymentMethod {
    id?: string;
    name?: string;
}

export interface PaymentMethods {
}

export interface PlayerBookingTypeAssociation {
    bookingPlayerType?: BookingPlayerType;
    supportingDocument?: string;
}
export interface PlayerClubWallet {
    id?: number;
    currentBalance?: number;
}

export interface PlayerClubWalletBalance {
    player?: PlayerData;
    availableBalance?: number;
    topups?: PlayerClubWalletTopup[];
}

export interface PlayerClubWalletBalancePage extends PagedData<PlayerClubWalletBalance> {
}

export interface PlayerClubWalletTopup {
    id?: number;
    player?: PlayerData;
    topUpDate?: Date;
    topUpAmount?: number;
    validUntil?: Date;
    amountDeducted?: number;
    topUpReason?: string;
    topUpDescription?: string;
    topUpBy?: UserAuthentication;
    topUpTimestamp?: Date;
    lastUpdatedBy?: UserAuthentication;
    lastUpdatedTimestamp?: Date;
    transactions?: PlayerClubWalletTransaction[];
}

export interface PlayerClubWalletTopupPage extends PagedData<PlayerClubWalletTopup> {
}

export interface PlayerClubWalletTransaction {
    id?: number;
    transactionDate?: Date;
    amount?: number;
    debitOrCredit?: DebitOrCredit;
    transactionCreatedBy?: UserAuthentication;
    transactionTimestamp?: Date;
    outlet?: ClubOutlet;
    playerId?: number;
    playerName?: string;
    walletId?: number;
    topUpId?: number;
    topUpDate?: Date;
    validUntil?: Date;
    topUpAmount?: number;
    amountDeducted?: number;
    reference?: string;
    description?: string;
    expenditureType?: string;
    transactionContext?: string;
}

export interface PlayerClubWalletTransactionPage extends PagedData<PlayerClubWalletTransaction> {
}

export interface PlayerData {
    id?: number;
    accountNo?: string;
    handicapSystemNo?: string;
    golfAssociationNo?: string;
    organization?: string;
    nickName?: string;
    profile?: string;
    handicap?: number;
    handicapIndex?: number;
    hidx?: number;
    dateJoined?: Date;
    status?: string;
    type?: string;
    complete?: boolean;
    color?: string;
    deviceToken?: string;
    teeBox?: TeeBoxData;
    defaultHandicapSystem?: HandicapSystem;
    playerName?: string;
    firstName?: string;
    lastName?: string;
    passport?: string;
    email?: string;
    age?: number;
    gender?: string;
    dateOfBirth?: Date;
    image?: string;
    nationality?: CountryData;
    country?: CountryData;
    address?: AddressData;
    userId?: number;
    userName?: string;
    authentication?: UserAuthentication;
    phone?: number;
    playerId?: number;
    userProfile?: UserProfile;
    addresses?: UserAddress[];
    deleteRequested?: boolean;
    deleteRequestedOn?: Date;
    accountDeleted?: boolean;
    accountDeletedOn?: Date;
    addedByClub?: ClubData;
    addedByPartner?: DiscountCompany;
    invoicingOption?: EInvoicingOption;
    membership?: ClubMembership;
    einvoiceEntityIndividual?: EInvoicingEntity;
    einvoiceEntityCompany?: EInvoicingEntity;
}

export interface PlayerDataLite {
    id?: number;
    playerId?: number;
    firstName?: string;
    lastName?: string;
    playerName?: string;
    playerPhoto?: string;
    countryId?: string;
    countryName?: string;
    gender?: string;
  defaultHandicapSystem?: string;
}

export interface PlayerDataLitePage extends PagedData<PlayerDataLite> {
}

export interface PlayerDataPage extends PagedData<PlayerData> {
}

export interface PlayerEInvoiceForm {
    company?: EInvoicingEntityForm;
    individual?: EInvoicingEntityForm;
}

export interface PlayerGroup {
    id?: number;
    groupName?: string;
    players?: PlayerInfo[];
}

export interface PlayerGroupList extends PagedResult {
    playerGroups?: PlayerGroup[];
}

export interface PlayerHomeInfo {
    playerId?: number;
    playerName?: string;
    totalScoreCards?: number;
    totalFriends?: number;
    activeCompetitions?: number;
    error?: boolean;
    errorMessage?: string;
    player?: PlayerInfo;
    testUser?: boolean;
    compsActiveToday?: CompetitionInfo[];
}

export interface PlayerImportInstance {
    id?: number;
    importCreatedAt?: Date;
    importFinishedAt?: Date;
    importFileUrl?: string;
    totalPlayers?: number;
    totalRegistered?: number;
    totalMemberships?: number;
    totalErrors?: number;
    status?: string;
    club?: ClubData;
    importedBy?: UserAuthentication;
    sampleData?: any[];
}

export interface PlayerImportInstancePage extends PagedData<PlayerImportInstance> {
}

export interface PlayerInfo {
    userId?: number;
    userName?: string;
    playerId?: number;
    playerName?: string;
    firstName?: string;
    lastName?: string;
    nickName?: string;
    email?: string;
    phone?: string;
    handicap?: number;
    handicapIndex?: number;
    mygolfHandicapIndex?: number;
    defaultHandicapSystem?: any;
    // defaultHandicapSystem?: HandicapSystem;
    handicapIn?: string;
    gender?: string;
    countryId?: string;
    countryName?: string;
    sportCode?: string;
    flagUrl?: string;
    photoUrl?: string;
    thumbnail?: string;
    dateJoined?: Date;
    birthdate?: Date;
    friendSince?: Date;
    teeOffFrom?: string;
    nhsNumber?: string;
    status?: string;
    errorMessage?: string;
    userProfile?: UserProfile;
    addressInfo?: AddressInfo;
    userAddresses?: UserAddress[];
    allowEdit?: boolean;
    membership?: string;
    membershipJoinDate?: Date;
    membershipExpiryDate?: Date;
    nationalityId?: string;
    nationalityName?: string;
    nationalityFlag?: string;
    password?: string;
    deleteRequested?: boolean;
    deleteRequestedOn?: Date;
    deleted?: boolean;
    deletedOn?: Date;
    addedByClub?: ClubInfo;
    addedByPartnerId?: string;
    addedByPartnerName?: string;
}

export interface PlayerInsurance {
    id?: number;
    name?: string;
    insuranceNo?: string;
    insuranceCompany?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    applicableIn?: string[];
    insuranceDocument?: string;
    player?: PlayerData;
    partner?: DiscountCompany;
}

export interface PlayerInsuranceForm {
    name?: string;
    insuranceNo?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    applicableIn?: string[];
    insuranceCompanyName?: string;
    insuranceCompanyId?: string;
    insuranceDocument?: MultipartFile;
}

export interface PlayerInsurancePage extends PagedData<PlayerInsurance> {
}

export interface PlayerList extends PagedResult {
    players?: PlayerInfo[];
}

export interface PlayerMembership {
    club?: ClubData;
    membershipNumber?: string;
    homeClub?: boolean;
    dateJoined?: Date;
    dateExpired?: Date;
    status?: MembershipStatus;
    membershipType?: string;
}

export interface PlayerPerformance {
    success?: boolean;
    errorMessage?: string;
    bestScore?: number;
    totalGrossScore?: number;
    totalScorecards?: number;
    averageScore?: number;
    playerPerformances?: PlayerPerformanceInfo[];
}

export interface PlayerPerformanceDetail {
    success?: boolean;
    errorMessage?: string;
    scoreStatistic?: ScoreStatistic;
    playerPerformanceDetails?: PlayerPerformanceDetailInfo[];
}

export interface PlayerPerformanceDetailInfo {
    gameRoundId?: number;
    playeRoundId?: number;
    gameType?: string;
    competitionId?: number;
    competitionName?: string;
    roundNo?: number;
    clubName?: string;
    clubId?: number;
    firstNineCourseName?: string;
    secondNineCourseName?: string;
    roundDate?: Date;
    inTotalGross?: number;
    outTotalGross?: number;
    totalGross?: number;
    inTotalNet?: number;
    outTotalNet?: number;
    totalNet?: number;
}

export interface PlayerPerformanceInfo {
    score?: number;
}

export interface PlayerRegistrationResult {
    success?: boolean;
    email?: string;
    userId?: number;
    playerId?: number;
    errorMessage?: string;
}

export interface PlayerRoundScores {
    playerRoundId?: number;
    playerId?: number;
    playerName?: string;
    nickName?: string;
    teamName?: string;
    gender?: string;
    photoUrl?: string;
    thumbnail?: string;
    teeOffFrom?: string;
    playerHandicap?: number;
    courseRating?: number;
    slopeRating?: number;
    handicapIndex?: number;
    handicapSystemApplied?: string;
    scoringPlayerId?: number;
    scorerName?: string;
    frontNineTotal?: number;
    backNineTotal?: number;
    totalScore?: number;
    diffGrossToPar?: number;
    status?: string;
    startTime?: string | Date;
    actualStartTime?: Date;
    frontNineNetTotal?: number;
    backNineNetTotal?: number;
    totalNetScore?: number;
    totalNetAdjustedScore?: number;
    diffNetToPar?: number;
    flightNumber?: string;
    startHole?: number;
    scores?: PlayerScore[];
    totals?: Array<any>; //NineTotals[];
    statusName?: string;
    totalPoints?: number;
}

export interface PlayerScore {
    scorecardId?: number;
    whichNine?: number;
    gameCourseId?: number;
    courseHoleId?: number;
    courseId?: number;
    holeNumber?: number;
    courseName?: string;
    holeIndex?: number;
    parScore?: number;
    actualScore?: number;
    netScore?: number;
    adjustedScore?: number;
    points?: number;
    updated?: boolean;
    shotsAllowed?: number;
    actualHoleNumber?: number;
}

export interface PlayerTotals {
    whichNine?: number;
    grossTotal?: number;
    netTotal?: number;
}
export interface NineTotals {
    whichNine?: number;
    grossTotal?: number;
    netTotal?: number;
    pointsTotal?: number;
}

export interface PlayerTransaction {
    transactionDate?: Date;
    context?: string;
    transactionGroup?: string;
    debitOrCredit?: DebitOrCredit;
    description?: string;
    referenceId?: string;
    reference?: string;
    amount?: number;
}

export interface PlayerTransactionByMonth {
    yearMonth?: string;
    monthName?: string;
    year?: number;
    amount?: number;
}

export interface PlayerTransactionList {
    club?: ClubDataLite;
    startDate?: Date;
    endDate?: Date;
    transactions?: PlayerTransaction[];
}

export interface RefundAndRedeem {
    playerId?: number;
    playerName?: string;
    transactionDate?: Date;
    type?: string;
    referenceType?: string;
    reference?: string;
    bookingId?: number;
    instanceId?: number;
    refundMode?: RefundMode;
    reason?: string;
    refundedBy?: UserAuthentication;
    amount?: number;
    expandMode?: boolean;
}

export interface DocumentType {
    id?: string;
    name?: string;
    description?: string;
    ageProof?: boolean;
    nationalityProof?: boolean;
    addressProof?: boolean;
    domicileProof?: boolean;
    professionProof?: boolean;
    country?: CountryData;
}

export interface UserAddress {
    name?: string;
    defaultAddress?: boolean;
    address?: AddressData;
}

export interface UserDocument {
    name?: string;
    documentNumber?: string;
    documentUrl?: string;
    documentType?: DocumentType;
}

export interface UserDocumentForm {
    name?: string;
    documentNumber?: string;
    documentType?: string;
    document?: MultipartFile;
}

export interface UserPage extends PagedData<UserAuthentication> {
}

export interface UserProfile {
    salutation?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    gender?: string;
    dateOfBirth?: Date;
    occupation?: string;
    staffId?: string;
    designation?: string;
    religion?: string;
    race?: string;
    maritalStatus?: MaritalStatus;
    marriageDate?: Date;
    photo?: string;
    profileImage?: string;
    phoneNumber?: string;
    shareWithClub?: boolean;
    shareWithOthers?: boolean;
    nationality?: CountryData;
}

export interface PlayerPromoUsage {
    usedOn?: Date;
    remarks?: string;
}

export interface PromoAssignment {
    id?: number;
    promoCoupon?: PromoCoupon;
    player?: PlayerData;
    validFrom?: Date;
    validUntil?: Date;
    maxUsage?: number;
    numberOfUsage?: number;
    lastUsedOn?: Date;
    usageHistory?: PlayerPromoUsage[];
}

export interface PromoContext {
    id?: string;
    name?: string;
    description?: string;
    usedBy?: string;
}

export interface PromoCoupon {
    id?: number;
    promoContext?: PromoContext;
    club?: ClubData;
    partner?: DiscountCompany;
    promoCode?: string;
    name?: string;
    description?: string;
    active?: boolean;
    validFrom?: Date;
    validUntil?: Date;
    needsAssignment?: boolean;
    termsAndConditions?: string;
}

export interface PromoCouponPage extends PagedData<PromoCoupon> {
}

export interface CreateNotificationResult {
    id?: string;
    recipients?: number;
    errors?: string[];
}

export interface PushMessageButton {
    id?: string;
    text?: string;
}

export interface PushNotification {
    titles?: PushNotificationText[];
    contents?: PushNotificationText[];
    filter?: any;
    buttons?: PushMessageButton[];
    data?: any;
}

export interface PushNotificationText {
    language?: string;
    text?: string;
}

export interface PushServerInfo {
    oneSignalApiURL?: string;
    appKey?: string;
    restApiKey?: string;
    userKey?: string;
    googleProjectNumber?: string;
}

export interface ClubBookingRecon {
    bookingId?: number;
    clubRecon?: ClubRecon;
    bookedBy?: string;
    bookingPlayerType?: string;
    flightCharges?: number;
    totalDeductions?: number;
    totalTaxes?: number;
    totalRefund?: number;
    totalOnlinePayment?: number;
    totalOfflinePayment?: number;
    totalCreditRedemption?: number;
    myGolf2uCommission?: number;
    paymentGatewayCommission?: number;
    payableToClub?: number;
    mygolf2uCommissionRate?: number;
    mygolf2uCommissionRateType?: AmountType;
}

export interface ClubRecon {
    id?: number;
    createdOn?: Date;
    club?: ClubData;
    reconUntil?: Date;
    payableToClub?: number;
    paid?: boolean;
    paidOn?: Date;
    paidBy?: UserAuthentication;
}

export interface PaymentGatewayRecon {
    id?: number;
    createdOn?: Date;
    paymentGateway?: PaymentGatewayInfo;
    reconUntil?: Date;
    totalAmountExpected?: number;
    totalAmountCredited?: number;
}

export interface BillItem {
    itemType?: string;
    sequence?: number;
    itemName?: string;
    itemCount?: number;
    unitPrice?: number;
    itemPrice?: number;
    packagePrice?: boolean;
}

export interface BookingAdditionalItemRequest {
    componentId?: string;
    bookingPlayerId?: number;
    itemCount?: number;
    unitPrice?: number;
    remarks?: string;
}

export interface BookingAffiliateMember {
    affiliatedClub?: number;
    affiliatedClubName?: string;
    membership?: string;
    membershipTypeId?: string;
    membershipTypeName?: string;
    affiliatePlayerType?: string;
    discountApplied?: number;
    discountName?: string;
    additionalCharge?: number;
}

export interface BookingAssignments {
    buggiesAssigned?: BuggyAssigned[];
    caddiesAssigned?: CaddieAssigned[];
    preferredCaddieAssigned?: boolean;
    allCaddiesAssigned?: boolean;
    buggyAssignmentDone?: boolean;
}

export interface BookingBillPayment {
    billDate?: Date;
    paymentSuccess?: boolean;
    pending?: boolean;
    paidAt?: Date;
    paymentMethod?: PaymentMethod;
    gatewayInfo?: PaymentGatewayInfo;
    paidAtClub?: boolean;
    paidFor?: PaidFor;
    amount?: number;
    player?: PlayerData;
}

export interface BookingCancellationPolicy {
    applyCancellationCharges?: boolean;
    pricingComponent?: string;
    chargeTiers?: CancellationTier[];
}

export interface BookingCount {
    maxBookingsPerDay?: number;
    maxUnpaidBookings?: number;
    totalBookings?: number;
    totalUnpaidBookings?: number;
}

export interface BookingDiscountBillItem {
    name?: string;
    amount?: number;
    voucher?: boolean;
    adhocWaiver?: boolean;
    waiverReason?: string;
}

export interface BookingInfo {
    bookingId?: number;
    bookingReference?: string;
    clubId?: number;
    clubName?: string;
    courseId?: number;
    courseName?: string;
    teeOffDate?: Date;
    teeOffTime?: Date;
    bookingStatus?: TeeTimeBookingStatus;
    amountPayable?: number;
    amountPaid?: number;
    commissionStatus?: BookingCommissionStatus;
}

export interface BookingOfflinePayment {
    bookingId?: number;
    paymentDate?: Date;
    paidFor?: string;
    payments?: OfflinePayment[];
}

export interface BookingPayment {
    id?: number;
    paidBy?: string;
    datePaid?: Date;
    amountPaid?: number;
    whatIsPaid?: string;
    billId?: number;
    playerId?: number;
    bookingPlayerId?: number;
    paymentMethod?: string;
    paymentCapturedBy?: string;
    authId?: number;
    walletId?: number;
    walletTopUpId?: number;
    walletTransactionId?: number;
}

export interface BookingPlayerCharges {
    sequence?: number;
    bookingPlayerId?: number;
    playerId?: number;
    playerName?: string;
    playerTypeApplied?: string;
    billItems?: BillItem[];
    discounts?: BookingDiscountBillItem[];
}

export interface BookingPlayerType {
    id?: string;
    name?: string;
    description?: string;
    nationalitySpecific?: boolean;
    clubData?: ClubData;
}

export interface BookingPlayerVoucher {
    id?: number;
    bookingPlayerId?: number;
    playerId?: number;
    playerName?: string;
    voucherId?: number;
    voucherNumber?: string;
    voucherSeriesId?: number;
    voucherSeriesNumber?: string;
    componentId?: string;
    componentName?: string;
}

export interface BookingPriceDeduction {
    bookingPlayerId?: number;
    component?: string;
    componentName?: string;
    itemCount?: number;
    unitPrice?: number;
    itemPrice?: number;
}

export interface BookingRefund {
    partnerId?: string;
    playerRefunded?: PlayerData;
    refundDate?: Date;
    refundAmount?: number;
    refundMode?: RefundMode;
    description?: string;
    refundReason?: string;
    refundValidUntil?: Date;
}

export interface BookingRequestDetails {
    reference?: string;
    request?: TeeTimeSlotBookingRequest;
    playerId?: number;
    authenticationId?: number;
    partnerId?: string;
    requestLocale?: Locale;
    bookingMedium?: string;
}

export interface BookingRequestResponse {
    booking?: TeeTimeBooking;
    bookingCreatedAt?: Date;
    depositCutOffDate?: Date;
    reasonForFailure?: string;
}

export interface BookingWalletRevert {
    walletId?: number;
    topUpId?: number;
    transactionId?: number;
    amount?: number;
}

export interface BuggyAndCaddiePreference {
    buggyRequired?: boolean;
    buggyType?: string;
    assignBuggy?: boolean;
    buggyPairing?: number;
    buggyShared?: boolean;
    buggySharedBetween?: number;
    driving?: boolean;
    additionalBuggies?: BuggyCount[];
    caddieRequired?: boolean;
    caddieGender?: string;
    caddieGrade?: number;
    assignCaddy?: boolean;
    caddiePairing?: number;
    preferredCaddieId?: number;
    caddieShared?: boolean;
    caddieSharedBetween?: number;
    additionalCaddies?: CaddieCount[];
    preferredCaddies?: number[];
}

export interface BuggyAssigned {
    buggyTypeId?: string;
    buggyTypeName?: string;
    buggyId?: number;
    buggyNumber?: string;
    additional?: boolean;
    additionalItemId?: number;
    sharedBetween?: number[];
}

export interface BuggyCaddiePreference {
    bookingId?: number;
    ignoreBuggyUpdate?: boolean;
    ignoreCaddieUpdate?: boolean;
    playerPairings?: PlayerBuggyCaddiePreference[];
}

export interface BuggyCount {
    buggyType?: string;
    buggyCount?: number;
}

export interface CaddieAssigned {
    caddieId?: number;
    caddieName?: string;
    gender?: string;
    grade?: number;
    gradeName?: string;
    additional?: boolean;
    sharedBetween?: number[];
}

export interface CaddieCount {
    grade?: number;
    gender?: string;
    caddieCount?: number;
}

export interface CaddySelectionCriteria {
    caddyRequired?: boolean;
    gender?: string;
    maxAge?: number;
    minAge?: number;
    initialPreference?: boolean;
}

export interface CancelBookingSpecification {
    bookingId?: number;
    reason?: string;
    refundReason?: string;
    refundAmount?: number;
    refundSplits?: BookingRefund[];
    walletReverts?: BookingWalletRevert[];
}

export interface CancellationTier {
    cancelledBeforeHours?: number;
    cancelledByClub?: MygolfAmount;
    cancelledByPlayer?: MygolfAmount;
}

export interface ClubSlotCounts {
    club?: ClubDataLite;
    slotCounts?: SlotCounts;
}

export interface ClubSlotCountsPage extends PagedData<ClubSlotCounts> {
}

export interface ClubTSlotList {
    club?: ClubDataLite;
    course?: ClubCourseLite;
    slotsOpenForBooking?: boolean;
    distance?: number;
    distanceFrom?: LocationData;
    availableSlots?: number;
    dealsAvailable?: boolean;
    lowestPrice?: number;
    slots?: TSlotDisplay[];
}

export interface ClubTeeTimeSlotPage extends PagedData<ClubTeeTimeSlots> {
}

export interface ClubTeeTimeSlots {
    club?: ClubData;
    distance?: number;
    distanceFrom?: LocationData;
    availableSlots?: number;
    dealsAvailable?: boolean;
    lowestPrice?: number;
    slots?: TeeTimeSlotDisplay[];
}

export interface CourseRuleInfo extends Record {
}

export interface CourseSlotGenRuleHistory {
    effectiveFrom?: Date;
    rule?: TeeTimeSlotGenerationRule;
    secondCourseId?: number;
    secondCourseName?: string;
    crossOverMinutes?: number;
    generationActive?: boolean;
}

export interface CourseSlotGenerationRule {
    courseId?: number;
    courseName?: string;
    effective?: CourseSlotGenRuleHistory;
    history?: CourseSlotGenRuleHistory[];
}

export interface DisplayPrice extends Record {
}

export interface ItemizedBill {
    totalCharges?: number;
    taxes?: number;
    totalPayable?: number;
    totalDeductions?: number;
    totalPayment?: number;
    totalRefund?: number;
    balance?: number;
    totalAmount?: number;
    billItems?: BillItem[];
    playerCharges?: BookingPlayerCharges[];
    payments?: BookingPayment[];
    refunds?: BookingRefund[];
    discounts?: BookingDiscountBillItem[];
    changes?: string[];
}

export interface MygolfBookingCommission {
    calculatedDate?: Date;
    commissionCalculated?: number;
    commissionPayable?: number;
    principalAmount?: number;
    taxPayable?: number;
    totalPayable?: number;
    details?: MygolfBookingCommissionDetail[];
}

export interface MygolfBookingCommissionDetail {
    name?: string;
    commissionCalculated?: number;
}

export interface MygolfCommissionPlan {
    id?: string;
    name?: string;
    description?: string;
    defaultPlan?: boolean;
    club?: ClubData;
    rates?: MygolfCommissionRate[];
}

export interface MygolfCommissionPlanPage extends PagedData<MygolfCommissionPlan> {
}

export interface MygolfCommissionRate {
    id?: number;
    effectiveFrom?: Date;
    commission?: number;
    commissionType?: AmountType;
    commissionForClubPayment?: number;
    commissionTypeForClubPayment?: AmountType;
    onCancelCommission?: number;
    onCancelCommissionType?: AmountType;
    minCommissionAmount?: number;
    maxCommissionAmount?: number;
    calculateByPlayer?: boolean;
    commissionOnTotal?: boolean;
    taxAmount?: number;
    taxAmountType?: AmountType;
    playerTypeCommissions?: MygolfPlayerTypeCommission[];
}

export interface MygolfPlayerTypeCommission {
    playerType?: BookingPlayerType;
    commissionType?: AmountType;
    commission?: number;
    commissionForClubPayment?: number;
    commissionTypeForClubPayment?: AmountType;
}

export interface PlayerAssignments {
    driving?: boolean;
    buggyShared?: boolean;
    caddieShared?: boolean;
    buggiesAssigned?: BuggyAssigned[];
    caddiesAssigned?: CaddieAssigned[];
    preferredCaddieAssigned?: boolean;
}
// export interface PlayerBuggyCaddiePreference extends addPreference {
//         bookingPlayerId?: number;
//         assignedBuggy?: number;
//         buggyRequired?: boolean;
//         buggyPairing?: number;
//         driving?: boolean;
//         caddyRequired?: boolean;
//         caddieAssigned?: number;
//         caddiePreferred?: number;
//         caddyPairing?: number;
// }
export interface PlayerBuggyCaddiePreference extends addPreference {
    bookingPlayerId?: number;
    assignedBuggy?: number;
    buggyRequired?: boolean;
    buggyType?: string;
    buggyPairing?: number;
    driving?: boolean;
    caddyRequired?: boolean;
    caddieAssigned?: number;
    caddiePreferred?: number;
    caddieGender?: string;
    caddyPairing?: number;
}

export interface BuggyCaddiePreference {
    bookingId?: number;
    ignoreBuggyUpdate?: boolean;
    ignoreCaddieUpdate?: boolean;
    playerPairings?: PlayerBuggyCaddiePreference[];
}

export interface addPreference  {
    caddyPreferred?: CaddyData;
    caddyAssigned?: CaddyData;
}


export interface PriceComponentForm {
    id?: string;
    name?: string;
    description?: string;
    printSequence?: number;
    defaultComponent?: boolean;
    componentType?: PricingComponentType;
    availability?: string;
    additionalComponent?: boolean;
    unitOfMeasure?: string;
    availableForPricingPlan?: boolean;
    availableForOrder?: boolean;
    basePrice?: number;
    taxProfile?: string;
    transactionType?: string;
    iconFile?: MultipartFile;
}

export interface PriceComponentSearch {
    search?: string;
    componentType?: PricingComponentType;
    availability?: string;
    additionalComponent?: string;
    availableForPricingPlan?: string;
    availableForOrder?: string;
    active?: string;
    defaultComponent?: string;
    systemSeeded?: string;
}

export interface PricingComponentForm {
    id?: string;
    name?: string;
    description?: string;
    defaultComponent?: boolean;
    componentType?: PricingComponentType;
    availableForAll?: boolean;
    additionalComponent?: boolean;
    active?: boolean;
    unitOfMeasure?: string;
    basePrice?: number;
    availableForAdhocPurchase?: boolean;
    availableForPricingPlan?: boolean;
    taxProfile?: string;
    iconFile?: MultipartFile;
}

export interface PricingComponents {
}

export interface Known {
}

export interface SlotGenerationSpec {
    startTime?: Date;
    gapInMinutes?: number;
    slotsToGenerate?: number;
    endTime?: Date;
    allowWalking?: boolean;
    caddieMandatory?: boolean;
    availableForBooking?: boolean;
    allowNineHole?: boolean;
    allowEighteenHole?: boolean;
    membersOnly?: boolean;
    maxPlayers?: number;
    minPlayers?: number;
    maxPlayersPerBuggy?: number;
    maxPlayersPerCaddie?: number;
    maxPlayersPerBuggyJumbo?: number;
    maxPlayersPerCaddieJumbo?: number;
    regularPricingPlan?: number;
    promotionalPricingPlan?: number;
    pricingPlanJumbo?: number;
    agentSlots?: boolean;
    reservedForAgents?: string[];
}

export interface SlotInfo extends Record {
}

export interface SlotTemplateKey {
    dayName?: string;
    teeOffTime?: Date;
}

export interface SlotUpdateSpec {
    allowWalking?: string;
    availableForBooking?: string;
    reasonForBlocking?: string;
    allowNineHole?: string;
    allowEighteenHole?: string;
    membersOnly?: string;
    maxPlayers?: number;
    minPlayers?: number;
    maxPlayersPerBuggy?: number;
    maxPlayersPerCaddie?: number;
    maxPlayersPerBuggyJumbo?: number;
    maxPlayersPerCaddieJumbo?: number;
    regularPricingPlan?: number;
    clearPromotion?: boolean;
    promotionalPricingPlan?: number;
    clearJumboPricingPlan?: boolean;
    jumboPricingPlan?: number;
    agentSlots?: string;
    clearAgentList?: boolean;
    reservedForAgents?: string[];
}

export interface TSlot {
    slotNo?: number;
    slotDayId?: number;
    startCourse?: ClubCourseLite;
    secondCourse?: ClubCourseLite;
    teeOffDate?: Date;
    teeOffTime?: Date;
    availableForBooking?: boolean;
    membersOnly?: boolean;
    maxPlayers?: number;
    minPlayers?: number;
    waitingListSize?: number;
    reasonForBlocking?: string;
    allowWalking?: boolean;
    caddyMandatory?: boolean;
    maxPlayersPerBuggy?: number;
    maxPlayersPerCaddy?: number;
    nineHolesAllowed?: boolean;
    eighteenHolesAllowed?: boolean;
    agentSlots?: boolean;
    reservedForAgents?: string[];
    pricingPlan?: number;
    pricingPlanName?: string;
    pricingPlanPromotional?: number;
    pricingPlanPromotionalName?: string;
    pricingPlanJumbo?: number;
    pricingPlanJumboName?: string;
    currencyId?: string;
    depositBy?: Date;
    fullPaymentBy?: Date;
    maxPlayersPerBuggyJumbo?: number;
    maxPlayersPerCaddyJumbo?: number;
}

export interface TSlotDisplay {
    slot?: TSlot;
    slotType?: TeeTimeSlotType;
    available?: boolean;
    reasonsForUnavailability?: string[];
    currency?: string;
    originalPrices?: { [index: string]: number };
    displayPrices?: { [index: string]: number };
    clubToAgentPrices?: { [index: string]: number };
    agentToPlayerPrices?: { [index: string]: number };
}

export interface TSlotPrice {
    lowestPrice?: number;
    playerTypeLowest?: string;
    maxPrice?: number;
    playerTypeMax?: string;
}

export interface TeeBookingLite {
    bookingId?: number;
    bookingReference?: string;
    clubId?: number;
    clubName?: string;
    courseName?: string;
    teeOffDate?: Date;
    teeOffTime?: Date;
    bookingStatus?: TeeTimeBookingStatus;
    amountPayable?: number;
    amountPaid?: number;
    bookingPlayerId?: number;
    bookingPersonName?: string;
}

export interface TeeSlotKey {
    courseId?: number;
    teeOffDate?: Date;
    teeOffTime?: Date;
}

export interface TeeSlotSearchAndUpdateForm {
    search?: TeeSlotSearchCriteria;
    update?: SlotUpdateSpec;
}

export interface TeeSlotSearchCriteria extends TemplateSlotSearchCriteria {
    courses?: number[];
    fromDate?: Date;
    toDate?: Date;
}

export interface TeeSlotUpdateSpec {
    keys?: TeeSlotKey[];
    updateSpec?: SlotUpdateSpec;
}

export interface TeeTimeBillSplit {
    id?: number;
    bookingPlayerId?: number;
    name?: string;
    priceComponent?: TeeTimePriceComponent;
    additionalCharge?: TeeTimePricingAdditionalCharge;
    amount?: number;
    packageName?: string;
    itemCount?: number;
    tax?: boolean;
    source?: string;
    reference?: string;
    remarks?: string;
}

export interface TeeTimeBooking {
    id?: number;
    clubData?: ClubData;
    bookingStatus?: TeeTimeBookingStatus;
    totalPlayers?: number;
    buggyRequested?: number;
    caddyRequested?: number;
    ninesPlayed?: number;
    partialConfirm?: boolean;
    slotPreferred?: TeeTimeSlot;
    slotAssigned?: TeeTimeSlot;
    slotUsed?: TeeTimeSlot;
    bookingReference?: string;
    amountPayable?: number;
    depositPayable?: number;
    totalDeductions?: number;
    totalRefund?: number;
    amountPaid?: number;
    topUpOrRefund?: number;
    openForRegistration?: boolean;
    bookedByPlayer?: PlayerData;
    bookedByUser?: UserAuthentication;
    bookingPersonName?: string;
    bookingPersonEmail?: string;
    bookingPersonPhone?: string;
    assignmentDone?: boolean;
    priceMap?: { [index: string]: number };
    bookingRequestedAt?: Date;
    bookingCreatedAt?: Date;
    flight?: TeeTimeFlight;
    cancellationGuard?: boolean;
    jumboFlight?: boolean;
    cancelGuardBy?: UserAuthentication;
    buggiesAssigned?: BuggyData[];
    caddiesAssigned?: CaddyData[];
    bookingPlayers?: TeeTimeBookingPlayer[];
    bookingDiscounts?: TeeTimeBookingDiscount[];
    refunds?: RefundInstance[];
    payments?: TeeTimeBookingBill[];
    cancellationReason?: string;
    canceledBy?: UserAuthentication;
    cancelledAt?: Date;
    depositBy?: Date;
    fullPaymentBy?: Date;
    additionalItems?: TeeTimeBookingAdditionalItem[];
    commissionStatus?: BookingCommissionStatus;
    commissionCalculationError?: string;
    bookingMedium?: string;
    pricingPlanApplied?: string;
    totalBuggiesAssigned?: number;
    totalCaddiesAssigned?: number;
    gracePeriodFrom?: Date;
    bookingAgent?: DiscountCompany;
    teeOffDate?: Date;
    teeOffTime?: Date;
    prevTeeOffDate?: Date;
    prevTeeOffTime?: Date;
    invoiceNo?: string;
    assignments?: BookingAssignments;
    cancelled?: boolean;
}

export interface TeeTimeBookingAdditionalItem {
    id?: number;
    bookingPlayer?: TeeTimeBookingPlayer;
    component?: TeeTimePriceComponent;
    itemCount?: number;
    unitPrice?: number;
    unitPriceUsed?: number;
    itemCharge?: number;
    remarks?: string;
}

export interface TeeTimeBookingBill {
    id?: number;
    booking?: TeeTimeBooking;
    whatIsPaid?: string;
    billId?: number;
    amountPaid?: number;
    payingBookingPlayer?: TeeTimeBookingPlayer;
    payingPlayer?: PlayerData;
    payingPartner?: DiscountCompany;
    payingPlayerName?: string;
    payingPlayerEmail?: string;
    payingPlayerPhone?: string;
    paymentCapturedBy?: UserAuthentication;
}

export interface TeeTimeBookingDiscount {
    sequence?: number;
    deductionDate?: Date;
    bookingPlayerId?: number;
    discountApplied?: TeeTimeDiscount;
    voucherApplied?: TeeTimeClubVoucher;
    amountDeducted?: number;
    adhocWaiver?: boolean;
    adhocWaiverReason?: string;
    adhocWaiverBy?: UserAuthentication;
    discountAudit?: DiscountAudit;
    transaction?: ClubTransaction;
}

export interface TeeTimeBookingEffectiveOptions {
    id?: number;
    club?: ClubData;
    effectiveFrom?: Date;
    name?: string;
    currency?: CurrencyData;
    options?: TeeTimeBookingOptions[];
}

export interface TeeTimeBookingFnb {
    productCode?: string;
    productName?: string;
    unitPrice?: number;
    quantity?: number;
    price?: number;
}

export interface TeeTimeBookingOptions {
    dayName?: string;
    specialDate?: Date;
    name?: string;
    depositAmount?: number;
    depositAmountType?: AmountType;
    depositCutOffDays?: number;
    checkinMinutes?: number;
    cancelBeforeHours?: number;
    addressMandatory?: boolean;
    buggyMandatory?: boolean;
    maxPlayersPerBuggy?: number;
    caddyMandatory?: boolean;
    maxPlayersPerCaddy?: number;
    minAgeForSeniorCitizens?: number;
    maxAgeForJuniors?: number;
    maxUnpaidBookings?: number;
    allowToSeeBookingByOthers?: boolean;
    maxShiftsPerDayCaddie?: number;
    minMinutesBetweenCaddieShifts?: number;
    maxShiftsPerDayBuggy?: number;
    minMinutesBetweenBuggyShifts?: number;
    cancelPolicyAfterDeposit?: CancelPolicy;
    cancelPolicyAfterPartialPayment?: CancelPolicy;
    cancelPolicyAfterFullPayment?: CancelPolicy;
    penaltyAfterDeposit?: number;
    penaltyAfterPartialPayment?: number;
    penaltyAfterFullPayment?: number;
    fullPaymentCutOffHours?: number;
    showPlayersToCaddie?: boolean;
    roundUpTo?: number;
    roundingMethod?: string;
    allowCaddiePreference?: boolean;
    minPlayersJumboFlight?: number;
    sharedBuggyPricing?: string;
    sharedCaddiePricing?: string;
    showCaddieAssignments?: boolean;
    maxBookingsPerDay?: number;
    promotionalApplicableToWalkin?: boolean;
    displayStandardPrice?: boolean;
    forceInsurance?: boolean;
    memberCancelGuard?: boolean;
    chargeToAccountEnabled?: boolean;
}

export interface TeeTimeBookingPage extends PagedData<TeeTimeBooking> {
}

export interface TeeTimeBookingPlayer {
    id?: number;
    sequence?: number;
    player?: PlayerData;
    playerName?: string;
    email?: string;
    phone?: string;
    gender?: string;
    playerContact?: string;
    confirmed?: boolean;
    playerType?: BookingPlayerType;
    playerTypeUsed?: BookingPlayerType;
    walking?: boolean;
    pairingNo?: number;
    buggyType?: BuggyType;
    buggyCaddiePreference?: BuggyAndCaddiePreference;
    driving?: boolean;
    caddyPairing?: number;
    caddyPreferred?: CaddyData;
    caddySelectionCriteria?: CaddySelectionCriteria;
    assignment?: PlayerAssignments;
    affiliateMember?: BookingAffiliateMember;
    caddyAssigned?: CaddyData;
    buggyId?: number;
    estimatedArrivalTime?: Date;
    playerRemoved?: boolean;
    playerHasInsurance?: boolean;
    teeTimeBookingFnbs?: TeeTimeBookingFnb[];
    vouchersAssigned?: BookingPlayerVoucher[];
    checkedInBy?: UserDataLite;
    checkedInAt?: string;
    totalItem?:number
    excludeFromAgentCommission?: boolean;
}

export interface TeeTimeComponentVoucherSetting {
    id?: number;
    priceComponent?: TeeTimePriceComponent;
    startDate?: Date;
    endDate?: Date;
    voucherSeriesId?: number;
    voucherSeriesName?: string;
    voucherSeriesNumber?: string;
}

export interface TeeTimeFlight {
    id?: number;
    status?: TeeTimeFlightStatus;
    createdAt?: Date;
    flightDispachedAt?: Date;
    playStartedAt?: Date;
    flightCrossedOverAt?: Date;
    flightFinishedAt?: Date;
    caddyMaster?: UserAuthentication;
    rainCheckIssued?: boolean;
}

export interface TeeTimeFlightBuggy {
    sequence?: number;
    buggy?: BuggyData;
}

export interface TeeTimePrice {
    id?: number;
    playerType?: BookingPlayerType;
    priceComponent?: TeeTimePriceComponent;
    applicableTo?: any;
    mandatory?: boolean;
    price18Hole?: number;
    price9Hole?: number;
    addToDisplayPrice?: boolean;
    packageName?: string;
}

export interface TeeTimePriceComponent {
    clubId?: number;
    clubName?: string;
    id?: string;
    name?: string;
    description?: string;
    systemSeeded?: boolean;
    printSequence?: number;
    defaultComponent?: boolean;
    componentType?: PricingComponentType;
    availability?: string;
    additionalComponent?: boolean;
    active?: boolean;
    iconUrl?: string;
    transactionType?: TransactionType;
    unitOfMeasure?: string;
    basePrice?: number;
    availableForAdhocPurchase?: boolean;
    availableForPricingPlan?: boolean;
    taxProfile?: TaxProfile;
}

export interface TeeTimePricingAdditionalCharge {
    id?: number;
    name?: string;
    amountType?: AmountType;
    amount?: number;
    printSequence?: number;
    tax?: boolean;
    nineHoleAmount?: number;
    priceComponent?: TeeTimePriceComponent;
    packageName?: string;
    applicableComponents?: TeeTimePriceComponent[];
    applicablePlayerTypes?: BookingPlayerType[];
}

export interface TeeTimePricingPlan {
    id?: number;
    name?: string;
    description?: string;
    currency?: CurrencyData;
    promotional?: boolean;
    discountsApplicable?: boolean;
    commissionPlan?: MygolfCommissionPlan;
    prices?: TeeTimePrice[];
    additionalCharges?: TeeTimePricingAdditionalCharge[];
    useVisitorOnAll?: boolean;
    targetType?: TargetType;
}

export interface TeeTimeSlot {
    slotNo?: number;
    slotDayId?: number;
    startCourse?: ClubCourseData;
    secondCourse?: ClubCourseData;
    teeOffDate?: Date;
    teeOffTime?: Date;
    availableForBooking?: boolean;
    membersOnly?: boolean;
    maxPlayers?: number;
    minPlayers?: number;
    waitingListSize?: number;
    reasonForBlocking?: string;
    allowWalking?: boolean;
    caddyMandatory?: boolean;
    maxPlayersPerBuggy?: number;
    maxPlayersPerCaddy?: number;
    nineHolesAllowed?: boolean;
    eighteenHolesAllowed?: boolean;
    agentSlots?: boolean;
    reservedForAgents?: string[];
    pricingPlan?: TeeTimePricingPlan;
    pricingPlanPromotional?: TeeTimePricingPlan;
    currency?: CurrencyData;
    depositBy?: Date;
    fullPaymentBy?: Date;
    pricingPlanJumbo?: TeeTimePricingPlan;
    maxPlayersPerBuggyJumbo?: number;
    maxPlayersPerCaddyJumbo?: number;
}

export interface TeeTimeSlotBookingRequest {
    clubId?: number;
    courseId?: number;
    teeOffDate?: any; //;
    teeOffTimeFrom?: string; //Date;
    teeOffTimeTo?: string; //Date;
    totalPlayers?: number;
    buggyRequired?: number;
    caddiesRequired?: number;
    ninesPlaying?: number;
    bookingAgent?: string;
    bookingName?: string;
    bookingEmail?: string;
    bookingPhone?: string;
    addBookingPlayer?: boolean;
    bookingRequestedAt?: Date;
}

export interface TeeTimeSlotCalendar {
    startDate?: Date;
    endDate?: Date;
    days?: TeeTimeSlotDay[];
}

export interface TeeTimeSlotDay {
    id?: number;
    course?: ClubCourseData;
    teeOffDate?: Date;
    openForBooking?: boolean;
    bookingClosed?: boolean;
    slots?: TeeTimeSlot[];
    secondNine?: ClubCourseData;
    rule?: TeeTimeSlotGenerationRule;
}

export interface TeeTimeSlotDisplay {
    slot?: TeeTimeSlot;
    slotType?: TeeTimeSlotType;
    available?: boolean;
    reasonsForUnavailability?: string[];
    currency?: CurrencyData;
    originalPrices?: { [index: string]: number };
    displayPrices?: { [index: string]: number };
    clubToAgentPrices?: { [index: string]: number };
    agentToPlayerPrices?: { [index: string]: number };
    internationPricesAvailable?: boolean;
}

export interface TeeTimeSlotDisplayPage extends PagedData<TeeTimeSlotDisplay> {
}
// type Prices {
//         [index]: string;
// }

export interface DisplayPrices {
    ARMY?: number;
    GOVT?: number;
    GUEST?: number;
    JUNIOR?: number;
    LADIES?: number;
    MEMBER?: number;
    POLICE?: number;
    SENIOR?: number;
    STAFF?: number;
    STD?: number;
    WOMAN?: number;
    PGUEST?: number;
    TMEMBER?: number;
}

export interface TeeTimeSlotGenerationRule {
    id?: number;
    name?: string;
    club?: ClubData;
    daysInAdvanceToGenerate?: number;
    daysInAdvanceForBooking?: number;
    published?: boolean;
    slotGenerationTime?: Date;
    slotOpenTime?: Date;
    dayRules?: TeeTimeSlotGenerationRuleDay[];
}

export interface TeeTimeSlotGenerationRuleDay {
    dayName?: string;
    displaySequence?: number;
    name?: string;
    holiday?: boolean;
    bookingDisabled?: boolean;
    firstSlotStartTime?: Date;
    minutesBetweenSlots?: number;
    totalSlots?: number;
    maxPlayersPerSlot?: number;
    minPlayersPerSlot?: number;
    waitingListSize?: number;
    allowWalking?: boolean;
    caddyMandatory?: boolean;
    maxPlayersPerBuggy?: number;
    maxPlayersPerCaddy?: number;
    pricingPlan?: TeeTimePricingPlan;
    pricingPlanPromotional?: TeeTimePricingPlan;
    pricingPlanJumbo?: TeeTimePricingPlan;
    maxPlayersPerBuggyJumbo?: number;
    maxPlayersPerCaddyJumbo?: number;
    specialDay?: TeeTimeSpecialDay;
    templateSlotGenSpecs?: SlotGenerationSpec[];
    slotTemplates?: TeeTimeSlotTemplate[];
}

export interface TeeTimeSlotTemplate {
    slotNo?: number;
    teeOffTime?: Date;
    minPlayers?: number;
    maxPlayers?: number;
    waitingListSize?: number;
    availableForBooking?: boolean;
    membersOnly?: boolean;
    reasonForBlocking?: string;
    pricingPlan?: TeeTimePricingPlan;
    pricingPlanPromotional?: TeeTimePricingPlan;
    pricingPlanJumbo?: TeeTimePricingPlan;
    allowWalking?: boolean;
    caddyMandatory?: boolean;
    maxPlayersPerBuggy?: number;
    maxPlayersPerBuggyJumbo?: number;
    maxPlayersPerCaddy?: number;
    maxPlayersPerCaddyJumbo?: number;
    agentSlots?: boolean;
    reservedForAgents?: string[];
    deleted?: boolean;
    nineHolesAllowed?: boolean;
    eighteenHolesAllowed?: boolean;
    period?: string;
}

export interface TeeTimeSlotType {
    weekend?: boolean;
    publicHoliday?: boolean;
    afternoon?: boolean;
    dayId?: number;
}

export interface TeeTimeSpecialDate {
    id?: number;
    name?: string;
    specialDate?: Date;
    recurring?: boolean;
}

export interface TeeTimeSpecialDay {
    id?: number;
    name?: string;
    club?: ClubData;
    specialDates?: TeeTimeSpecialDate[];
}

export interface TemplateSlotSearchAndUpdateForm {
    search?: TemplateSlotSearchCriteria;
    update?: SlotUpdateSpec;
}

export interface TemplateSlotSearchCriteria {
    slotsIn?: string;
    teeOffTimeFrom?: Date;
    teeOffTimeTo?: Date;
    weekDays?: number[];
    specialDays?: number[];
    booked?: string;
    allowWalking?: string;
    availableForBooking?: string;
    allowNineHole?: string;
    allowEighteenHole?: string;
    membersOnly?: string;
    maxPlayers?: number;
    minPlayers?: number;
    maxPlayersPerBuggy?: number;
    maxPlayersPerCaddie?: number;
    regularPricingPlan?: number;
    promotionalPricingPlan?: number;
    jumboPricingPlan?: number;
}

export interface TemplateSlotUpdateSpec {
    keys?: SlotTemplateKey[];
    update?: SlotUpdateSpec;
}

export interface BookingCountsByDate {
    bookingDate?: Date;
    playerBookings?: PlayerBookings[];
}

export interface BookingInfoLite {
    bookingId?: number;
    bookingReference?: string;
    bookingStatus?: string;
    slotTime?: Date;
}

export interface BookingPlayerTypeDistribution {
    totalPlayers?: number;
    totalMen?: number;
    totalWomen?: number;
    totalMembers?: number;
    playerTypeMap?: { [index: string]: number };
}

export interface BookingStatistics {
    overallStatus?: SlotBookingStatus;
    morningStatus?: SlotBookingStatus;
    afternoonStatus?: SlotBookingStatus;
    internal?: boolean;
    dayStatus?: { [index: string]: BookingStatistics };
}

export interface CaddieBuggyAssignmentStatistics {
    totalCaddies?: number;
    totalMen?: number;
    totalWomen?: number;
    totalBuggies?: number;
}

export interface CaddieBuggyStatistics {
    overallStat?: CaddieBuggyAssignmentStatistics;
    morningStat?: CaddieBuggyAssignmentStatistics;
    afternoonStat?: CaddieBuggyAssignmentStatistics;
}

export interface CourseUtilization {
    courseId?: number;
    courseName?: string;
    totalSlots?: number;
    totalBooked?: number;
}

export interface CourseUtilizationStatistics {
    overallUtilization?: CourseUtilization[];
    morningUtilization?: CourseUtilization[];
    afternoonUtilization?: CourseUtilization[];
    dayUtilization?: { [index: string]: CourseUtilizationStatistics };
}

export interface FutureBookingStatistics {
    overall?: FutureRevenue;
    morning?: FutureRevenue;
    afternoon?: FutureRevenue;
}

export interface FutureRevenue {
    totalBookings?: number;
    totalBuggies?: number;
    totalCaddies?: number;
    estimatedRevenue?: number;
}

export interface PlayerBookings {
    playerId?: number;
    playerName?: string;
    totalBookings?: number;
    bookings?: BookingInfoLite[];
}

export interface SlotBookingStatus {
    totalSlots?: number;
    totalBooked?: number;
    totalPending?: number;
    totalCheckedIn?: number;
    totalWaitingDispatch?: number;
    totalInPlay?: number;
    totalFinished?: number;
    totalAbandoned?: number;
    amountPayable?: number;
    amountPaid?: number;
    playerTypeDistribution?: BookingPlayerTypeDistribution;
}

export interface SlotCounts {
    clubId?: number;
    clubName?: string;
    clubImage?: string;
    courseId?: number;
    courseName?: string;
    totalSlots?: number;
    amSlots?: number;
    pmSlots?: number;
    availableOnline?: number;
    availableOnlineAM?: number;
    availableOnlinePM?: number;
    bookedSlots?: number;
    bookedSlotsAM?: number;
    bookedSlotsPM?: number;
    membersOnlySlots?: number;
    agentsOnlySlots?: number;
    availableSlots?: number;
    availableSlotsAM?: number;
    availableSlotsPM?: number;
}

export interface ReportInfo {
    reportId?: string;
    reportName?: string;
    description?: string;
    reportDirectory?: string;
    designFile?: string;
    compiledFile?: string;
    reportTimeStamp?: Date;
    compiledAt?: Date;
    missing?: boolean;
    parameters?: ReportParameter[];
}

export interface ReportInfoPage extends PagedData<ReportInfo> {
}

export interface ReportParameter {
    parameterName?: string;
    valueClass?: string;
    nestedValueClass?: string;
    systemParameter?: boolean;
    prompting?: boolean;
    readSql?: string;
    description?: string;
}

export interface CompetitionRound {
    roundNo?: number;
    courseNames?: string;
    outTotal?: number;
    inTotal?: number;
    outTotalNet?: number;
    inTotalNet?: number;
    nines?: WhichNine[];
    inPoints?: number;
    outPoints?: number;
}

export interface GameRoundCourse {
  whichNine?: number;
  courseId?: number;
  courseName?: string;
  coursePar?: number;
}

export interface HoleScore {
    scorecardId?: number;
    playerRoundId?: number;
    gameCourseId?: number;
    courseHoleId?: number;
    whichNine?: number;
    holeNo?: number;
    courseHoleNo?: number;
    parScore?: number;
    index?: number;
    grossScore?: number;
    adjustedGross?: number;
    netScore?: number;
    points?: number;
    remarks?: string;
    toPar?: number;
    toParNet?: number;
    updated?: boolean;
    shotsAllowed?: number;
}

export interface PlayerScorecard {
    playerRoundId?: number;
    playerId?: number;
    playerName?: string;
    gender?: string;
    playerPhoto?: string;
    playerThumbnail?: string;
    nhs?: string;
    handicapIndex?: number;
    handicap?: number;
    playingHandicap?: number;
    playedClubId?: number;
    playedClubName?: string;
    coursesPlayed?: string;
    competitionId?: number;
    competitionName?: string;
    competition?: CompetitionDataLite;
    scoringFormat?: ScoringFormatData;
    gameRoundId?: number;
    roundNo?: number;
    playedOn?: Date;
    startTime?: Date;
    actualStartTime?: Date;
    startingHole?: number;
    holesPlayed?: number;
    courseRating?: number;
    slopeRating?: number;
    scorerId?: number;
    scorerName?: string;
    flightNo?: string;
    buggyNo?: string;
    buggyId?: number;
    caddieId?: number;
    statusName?: PlayerRoundStatus;
    status?: string;
    handicapStatus?: string;
    teeBoxName?: string;
    submittedForHandicap?: boolean;
    outTotalGross?: number;
    inTotalGross?: number;
    totalGross?: number;
    outTotalNet?: number;
    inTotalNet?: number;
    totalNet?: number;
    outPoints?: number;
    inPoints?: number;
    totalPoints?: number;
    toParGross?: number;
    toParNet?: number;
    totalParScored?: number;
    totalPar?: number;
    playerPositionGross?: number;
    ocbGross?: boolean;
    ocbStatGross?: string;
    playerPositionNet?: number;
    ocbNet?: boolean;
    ocbStatNet?: string;
    handicapSystemApplied?: string;
    courses?: GameRoundCourse[];
    scores?: HoleScore[];
    updated?: boolean;
}

export interface PlayerScorecardPage extends PagedData<PlayerScorecard> {
}

export interface TeamPlayerOveralTotals {
    playerId?: number;
    playerName?: string;
    playerImage?: string;
    thumbnail?: string;
    handicap?: number;
    status?: string;
    qualified?: boolean;
    totalGross?: number;
    totalNet?: number;
    toPar?: number;
    toParNet?: number;
}

export interface TeamPlayerScores {
    playerId?: number;
    playerName?: string;
    playerImage?: string;
    thumbnail?: string;
    handicap?: number;
    playerRoundStatus?: string;
    competitionPlayerStatus?: string;
    totalGross?: number;
    totalNet?: number;
    inTotalGross?: number;
    outTotalGross?: number;
    inTotalNet?: number;
    outTotalNet?: number;
    toPar?: number;
    toParNet?: number;
    qualified?: boolean;
    scores?: HoleScore[];
}

export interface TeamRoundScores {
    roundNumber?: number;
    roundId?: number;
    status?: string;
    totalGross?: number;
    totalNet?: number;
    prevRoundPosition?: number;
    currentPosition?: number;
    toPar?: number;
    toParNet?: number;
    topNTotalGross?: number;
    topNTotalNet?: number;
    topNToPar?: number;
    topNToParNet?: number;
    playerScores?: TeamPlayerScores[];
}

export interface TeamScores {
    teamId?: number;
    teamName?: string;
    status?: string;
    teamLogo?: string;
    totalGross?: number;
    totalNet?: number;
    toPar?: number;
    toParNet?: number;
    position?: number;
    positionGross?: number;
    positionNet?: number;
    topNTotalGross?: number;
    topNTotalNet?: number;
    topNToPar?: number;
    topNToParNet?: number;
    ocb?: string;
    ocbNet?: string;
    prevPosition?: number;
    roundScores?: TeamRoundScores[];
    playerOveralTotals?: TeamPlayerOveralTotals[];
}

export interface TeamScoresResult {
    competitionStatus?: string;
    roundNo?: number;
    roundId?: number;
    teamId?: number;
    teamName?: string;
    teamStatus?: string;
    teamLogo?: string;
    playerId?: number;
    playerName?: string;
    playerImage?: string;
    playerThumbnail?: string;
    playerHandicap?: number;
    whichNine?: number;
    holeNumber?: number;
    holePar?: number;
    holeIndex?: number;
    actualScore?: number;
    netScore?: number;
    roundStatus?: string;
    playerRoundStatus?: string;
    competitionPlayerStatus?: string;
    topN?: number;
    scoreType?: string;
    teamPosition?: number;
    teamPositionNet?: number;
    ocb?: string;
    ocbNet?: string;
    totalGross?: number;
    totalNet?: number;
}

export interface WhichNine {
    nine?: number;
    courseName?: string;
    grossTotal?: number;
    netTotal?: number;
    pointsTotal?: number;
    scores?: HoleScore[];
}

export interface LeanScorecard {
    competitionId?: number;
    roundId?: number;
    roundNumber?: number;
    flightNumber?: string;
    scorerId?: number;
    flightMembers?: ScorecardMember[];
}

export interface PlayerHoleScore {
    scorecardId?: number;
    holeNumber?: number;
    actualScore?: number;
    netScore?: number;
    points?: number;
}

export interface ScorecardMember {
    playerRoundId?: number;
    playerId?: number;
    scorerId?: number;
    scores?: PlayerHoleScore[];
}

export interface Authority {
    id?: string;
    name?: string;
    description?: string;
}

export interface CaptchaResponse {
    success?: boolean;
    timestamp?: Date;
    hostname?: string;
    "error-codes"?: string[];
}

export interface LoginData {
    username?: string;
    password?: string;
    validateClubMember?: boolean;
    validateClubUser?: boolean;
    validateSuperAdmin?: boolean;
    allowSuperAdmin?: boolean;
    clubId?: number;
}

export interface Role {
    id?: string;
    name?: string;
    description?: string;
}

export interface RoleAuthority {
    name?: string;
    roles?: string[];
    authorities?: string[];
}

export interface RoleType {
    id?: string;
    name?: string;
}

export interface UserAuthentication {
    id?: number;
    name?: string;
    userName?: string;
    password?: string;
    algorithm?: string;
    salt?: string;
    combineUserName?: boolean;
    email?: string;
    phone?: string;
    active?: boolean;
    tokenKey?: string;
    userType?: RoleType;
    profile?: UserProfile;
    deleteRequested?: boolean;
    deleteRequestedOn?: Date;
    accountDeleted?: boolean;
    accountDeletedOn?: Date;
    documents?: UserDocument[];
    userAddresses?: UserAddress[];
    roles?: UserRole[];
    authorities?: Authority[];
    status?: string;
}

export interface UserDataLite {
    id?: number;
    name?: string;
    userName?: string;
    gender?: string;
    phone?: string;
    profileImage?: string;
}

export interface UserNamePassword {
    username?: string;
    password?: string;
}

export interface UserRole {
    role?: Role;
    clubId?: number;
    organizerId?: number;
    partnerId?: string;
    clubGroupId?: string;
    defaultRole?: boolean;
    club?: ClubDataLite;
    partner?: DiscountCompany;
}

export interface Bill {
    billId?: number;
    externalId?: string;
    billDate?: Date;
    billAmount?: number;
    description?: string;
    billPaid?: boolean;
    paidAtClub?: boolean;
    billPaidDate?: Date;
    status?: BillStatus;
    paymentFailureMessage?: string;
    paymentMethod?: string;
    paymentGatewayId?: string;
    paymentGatewayName?: string;
    gatewayPaymentMethod?: string;
    gatewayPaymentMethodName?: string;
    currency?: string;
    clientMessage?: string;
    returnMessage?: string;
    commissionRate?: number;
    commissionRateType?: AmountType;
    paymentGatewayCommission?: number;
    paidFor?: PaidFor;
    clubId?: number;
    clubName?: string;
    includedInGatewayRecon?: boolean;
    gatewayReconId?: number;
    includedInClubRecon?: boolean;
    clubReconId?: number;
    matchedWithGatewayStatement?: boolean;
    paymentGatewayStatementId?: number;
    includedInClubPayment?: boolean;
    clubPaymentInstance?: string;
    transactionGenerated?: boolean;
    transactionId?: string;
}

export interface BillPage extends PagedData<Bill> {
}

export interface BillSearchCriteria {
    paymentGatewayId?: string;
    paymentMethods?: string[];
    paidOrNot?: string;
    startDate?: Date;
    endDate?: Date;
    statuses?: BillStatus[];
    paidFors?: PaidFor[];
    paidAtClub?: string;
    clubId?: number;
    associatedToPaymentGateway?: string;
    includedInClubPayment?: string;
    search?: string;
}

export interface BookingCalculatedCommission {
    id?: number;
    calculatedDate?: Date;
    booking?: BookingInfo;
    commission?: MygolfBookingCommission;
    contra?: boolean;
    reversal?: BookingCalculatedCommission;
    clubPaymentInstanceId?: string;
}

export interface BookingCalculatedCommissionPage extends PagedData<BookingCalculatedCommission> {
}

export interface BookingPendingCommission {
    booking?: BookingInfo;
    estimatedCommission?: MygolfBookingCommission;
}

export interface BookingPendingCommissionPage extends PagedData<BookingPendingCommission> {
}

export interface ClubPayable {
    totalTransactionAmount?: number;
    totalGatewayCommission?: number;
    netPayable?: number;
    matchedTransactionAmount?: number;
    matchedCommission?: number;
}

export interface ClubPaymentInstance {
    id?: string;
    generatedOn?: Date;
    totalBillAmount?: number;
    totalGatewayCommission?: number;
    totalMygolf2uCommission?: number;
    totalPayable?: number;
    status?: ClubPaymentInstanceStatus;
    paidOn?: Date;
    paymentReference?: string;
    club?: ClubData;
    bills?: Bill[];
    commissions?: BookingCalculatedCommission[];
}

export interface ClubPaymentInstancePage extends PagedData<ClubPaymentInstance> {
}

export interface ClubReceivable {
    totalCommission?: number;
    commissionByStatus?: { [index: string]: number };
}

export interface MygolfCommissionAccountSetup {
    id?: number;
    commissionType?: RevenueType;
    name?: string;
    description?: string;
    club?: ClubData;
    partner?: DiscountCompany;
    debitAccount?: string;
    creditAccount?: string;
}

export interface MygolfCommissionAccountSetupForm {
    commissionType?: RevenueType;
    name?: string;
    description?: string;
    clubId?: number;
    partnerId?: string;
    debitAccount?: string;
    creditAccount?: string;
}

export interface MygolfCommissionAccountSetupPage extends PagedData<MygolfCommissionAccountSetup> {
}

export interface MygolfCurrencyMapping {
    externalAccounting?: MygolfExternalAccounting;
    currency?: CurrencyData;
    externalCurrencyCode?: string;
}

export interface MygolfExternalAccounting {
    id?: number;
    name?: string;
    authenticationDetails?: string;
    externalSystem?: ExternalSystem;
    startDate?: Date;
    endDate?: Date;
    defaultCurrency?: CurrencyData;
    currencyMappings?: MygolfCurrencyMapping[];
}

export interface MygolfJournalEntry {
    id?: number;
    context?: string;
    contextId?: string;
    reference?: string;
    description?: string;
    transactionDate?: Date;
    referenceDate?: Date;
    amount?: number;
    currencyCode?: string;
    synced?: boolean;
    syncedAt?: Date;
    journalLineItems?: MygolfJournalLineItem[];
}

export interface MygolfJournalEntryPage extends PagedData<MygolfJournalEntry> {
}

export interface MygolfJournalLineItem {
    sequence?: number;
    debitOrCredit?: string;
    account?: string;
    amount?: number;
}

export interface MygolfPaymentAccountSetup {
    id?: number;
    definedFor?: PaymentSetupFor;
    paymentGateway?: PaymentGatewayInfo;
    paidFor?: string;
    club?: ClubData;
    name?: string;
    debitAccount?: string;
    creditAccount?: string;
    additionalTransaction?: boolean;
    addlTrxnDebitAccount?: string;
    addlTrxnCreditAccount?: string;
    description?: string;
}

export interface MygolfPaymentAccountSetupForm {
    paymentGateway?: string;
    paidFor?: string;
    clubId?: number;
    name?: string;
    debitAccount?: string;
    creditAccount?: string;
    additionalTransaction?: boolean;
    addlTrxnDebitAccount?: string;
    addlTrxnCreditAccount?: string;
    description?: string;
}

export interface MygolfPaymentAccountSetupPage extends PagedData<MygolfPaymentAccountSetup> {
}

export interface MygolfRevenueShare {
    id?: number;
    revenueType?: RevenueType;
    club?: ClubData;
    startDate?: Date;
    endDate?: Date;
    name?: string;
    description?: string;
    published?: boolean;
    shared?: boolean;
    splits?: MygolfRevenueShareSplit[];
}

export interface MygolfRevenueSharePage extends PagedData<MygolfRevenueShare> {
}

export interface MygolfRevenueShareSplit {
    sequence?: number;
    partner?: DiscountCompany;
    splitType?: string;
    splitAmount?: number;
    splitPercentage?: number;
}

export interface PaymentGatewayStatement {
    id?: number;
    statementDate?: Date;
    reference?: string;
    amount?: number;
    creditRealized?: boolean;
    createdOn?: Date;
    matchedAmount?: number;
    totalDeductions?: number;
    totalPaidByGateway?: number;
    statementFileUrl?: string;
    paymentGateway?: PaymentGatewayInfo;
}

export interface PaymentGatewayStatementDetail {
    id?: number;
    reference?: string;
    paymentDate?: Date;
    amount?: number;
    paymentMethod?: string;
    discount?: number;
    gatewayCommission?: number;
    otherCommission?: number;
    gst?: number;
    paidByGateway?: number;
    matchedBillId?: number;
    billReference?: string;
    billDate?: Date;
    billAmount?: number;
    billCommission?: number;
    billPaymentMethod?: string;
    manuallyAssociated?: boolean;
    fullyMatched?: boolean;
    createdForBill?: boolean;
}

export interface PaymentGatewayStatementDetailPage extends PagedData<PaymentGatewayStatementDetail> {
}

export interface PaymentGatewayStatementForm {
    statementDate?: Date;
    reference?: string;
    creditRealized?: boolean;
    creditedOn?: Date;
    amount?: number;
    totalDeductions?: number;
}

export interface PaymentGatewayStatementPage extends PagedData<PaymentGatewayStatement> {
}

export interface PaymentGatewayStatementUploadForm {
    statementDate?: Date;
    statementId?: number;
    statementFile?: MultipartFile;
}

export interface PmtGtwClubOutstanding {
    clubId?: number;
    clubName?: string;
    clubLogo?: string;
    amount?: number;
    commission?: number;
    netAmount?: number;
}

export interface PmtGtwOutstanding {
    amount?: number;
    commission?: number;
    netAmount?: number;
    clubOutstandingAmounts?: PmtGtwClubOutstanding[];
}

export interface RevenueShareSplitForm {
    partnerId?: string;
    splitType?: string;
    splitAmount?: number;
    splitPercentage?: number;
}

export interface Hotel {
    id?: number;
    name?: string;
    address?: AddressData;
    description?: string;
    gpsLocation?: string;
    hotelLogo?: string;
    hotelImages?: string[];
    amenities?: string[];
    checkinTime?: Date;
    checkoutTime?: Date;
    rooms?: HotelRoom[];
}

export interface HotelForm extends AddressForm {
    name?: string;
    description?: string;
    gpsLocation?: string;
    checkinTime?: Date;
    checkoutTime?: Date;
    amenities?: string;
    logo?: MultipartFile;
}

export interface HotelPage extends PagedData<Hotel> {
}

export interface HotelRoom {
    id?: number;
    roomName?: string;
    roomSpecification?: string;
    maxOccupancy?: number;
    roomImages?: string[];
}

export interface PackagePlayOption {
    id?: number;
    club?: ClubData;
    course?: ClubCourseData;
    standardOption?: boolean;
    availableForAdditionalRound?: boolean;
    nineHoleRound?: boolean;
    maxRounds?: number;
    additionalCharge?: number;
    includesTax?: boolean;
    taxPercentage?: number;
    amOrPm?: string;
    additionalNineHoleCharge?: number;
    additionalEighteenHoleCharge?: number;
    additionalRoundTax?: number;
    premiumCharges?: StayAndPlayGolfPriceSpecification;
    additionalRoundChargesNine?: StayAndPlayGolfPriceSpecification;
    additionalRoundChargesEighteen?: StayAndPlayGolfPriceSpecification;
    surcharges?: PlayOptionSurcharge[];
    courseGroup?: CourseGroup;
}

export interface PackagePlayOptionForm {
    clubId?: number;
    courseId?: number;
    standardOption?: boolean;
    availableForAdditionalRound?: boolean;
    nineHoleRound?: boolean;
    maxRounds?: number;
    additionalCharge?: number;
    includesTax?: boolean;
    taxPercentage?: number;
    amOrPm?: string;
    additionalNineHoleCharge?: number;
    additionalEighteenHoleCharge?: number;
    additionalRoundTax?: number;
    premiumCharges?: StayAndPlayGolfPriceSpecification;
    addlRound18Charges?: StayAndPlayGolfPriceSpecification;
    addlRound9Charges?: StayAndPlayGolfPriceSpecification;
}

export interface PackageStayOption {
    id?: number;
    hotel?: Hotel;
    hotelRoom?: HotelRoom;
    roomSpecification?: string;
    standardOption?: boolean;
    defaultOption?: boolean;
    availableForAdditionalNight?: boolean;
    maxNights?: number;
    additionalCharge?: number;
    includesTax?: boolean;
    taxPercentage?: number;
    additionalNightCharge?: number;
    additionalNightTax?: number;
    premiumCharges?: StayAndPlayPackagePriceSpecification;
    additionalNightCharges?: StayAndPlayPackagePriceSpecification;
    surcharges?: StayAndPlaySurcharge[];
}

export interface PackageStayOptionForm {
    hotelId?: number;
    roomName?: string;
    roomSpecification?: string;
    standardOption?: boolean;
    defaultOption?: boolean;
    availableForAdditionalNight?: boolean;
    maxNights?: number;
    additionalCharge?: number;
    includesTax?: boolean;
    taxPercentage?: number;
    additionalNightCharge?: number;
    additionalNightTax?: number;
    premiumCharges?: StayAndPlayPackagePriceSpecification;
    addlNightCharges?: StayAndPlayPackagePriceSpecification;
}

export interface PlayOptionSelected {
    sequence?: number;
    playOption?: PackagePlayOption;
    noOfRounds?: number;
    dateOfPlay?: Date;
    timeOfPlay?: Date;
    additionalCharge?: number;
    taxOnAdditionalCharge?: number;
}

export interface PlayOptionSurcharge {
    surchargeName?: string;
    applicableOn?: DaySpecification;
    surchargeAmount?: number;
    includesTax?: boolean;
    taxPercentage?: number;
    additionalCharges?: StayAndPlayGolfPriceSpecification;
}

export interface PlayOptionSurchargeForm {
    surchargeName?: string;
    applicableOn?: number[];
    surchargeAmount?: number;
    includesTax?: boolean;
    taxPercentage?: number;
    additionalCharges?: StayAndPlayGolfPriceSpecification;
}

export interface StayAndPlayAdjustment {
    sequence?: number;
    adjustmentAmount?: number;
    remarks?: string;
    adjustedBy?: UserAuthentication;
    tax?: boolean;
}

export interface StayAndPlayCourse {
    id?: number;
    playOption?: PackagePlayOption;
    playingOn?: Date;
    playingIn?: string;
    additionalRound?: boolean;
    totalRounds?: number;
    total_charge?: number;
    teeSlotSpecification?: string;
    amountBreakup?: GameChargeDetails;
}

export interface StayAndPlayGameRequest {
    sequence?: number;
    requestId?: number;
    playOption?: number;
    dateOfPlay?: Date;
    playingIn?: string;
    numberOfRounds?: number;
    additionalRound?: boolean;
}

export interface StayAndPlayGolfPriceSpecification {
    surcharge?: boolean;
    priceLocal?: number;
    priceNonLocal?: number;
    includesTax?: boolean;
    taxPercentage?: number;
}

export interface StayAndPlayGroupRequestForm {
    startDate?: Date;
    endDate?: Date;
    playerId?: number;
    requesterName?: string;
    requesterEmail?: string;
    phoneNumber?: string;
    register?: boolean;
    gender?: string;
    totalPax?: number;
    specialInstructions?: string;
    roomRequests?: StayAndPlayRoomRequest[];
    gameRequests?: StayAndPlayGameRequest[];
    requestFromNonLocals?: boolean;
}

export interface StayAndPlayPackage {
    id?: number;
    packageName?: string;
    description?: string;
    internalDescription?: string;
    club?: ClubData;
    partner?: DiscountCompany;
    validFrom?: Date;
    validUntil?: Date;
    active?: boolean;
    availableOn?: DaySpecification;
    stayDuration?: StayAndPlayStayDurationSpec;
    golfRoundSpec?: StayAndPlayRoundSpec;
    maxAdditionalNights?: number;
    maxAdditional18HoleRounds?: number;
    maxAdditional9HoleRounds?: number;
    pax?: number;
    basePrice?: number;
    basePriceSingle?: number;
    basePriceTwin?: number;
    includesTax?: boolean;
    taxPercentage?: number;
    packagePrices?: StayAndPlayPackagePriceSpecification;
    packageImages?: string[];
    termsAndConditions?: string;
    currency?: CurrencyData;
    nonLocalPrice?: boolean;
    packageStayOptions?: PackageStayOption[];
    packagePlayOptions?: PackagePlayOption[];
    nearbyAttractions?: StayAndPlayPackageNearby[];
    surcharges?: StayAndPlaySurcharge[];
    pricingMappings?: StayAndPlayPricing[];
}

export interface StayAndPlayPackageForm {
    packageName?: string;
    description?: string;
    internalDescription?: string;
    validFrom?: Date;
    validUntil?: Date;
    availableOn?: number[];
    totalNights?: number;
    total18HoleRounds?: number;
    total9HoleRounds?: number;
    maxAdditionalNights?: number;
    maxAdditional18HoleRounds?: number;
    maxAdditional9HoleRounds?: number;
    pax?: number;
    currency?: string;
    basePrice?: number;
    basePriceSingle?: number;
    includesTax?: boolean;
    taxPercentage?: number;
    termsAndConditions?: string;
    separatePriceForNonLocals?: boolean;
    packagePrices?: StayAndPlayPackagePriceSpecification;
}

export interface StayAndPlayPackageNearby {
    id?: number;
    name?: string;
    description?: string;
    distance?: string;
    images?: string[];
}

export interface StayAndPlayPackagePage extends PagedData<StayAndPlayPackage> {
}

export interface StayAndPlayPackagePriceSpecification {
    surcharge?: boolean;
    pricesForLocals?: StayAndPlayPackagePrices;
    pricesForNonLocals?: StayAndPlayPackagePrices;
    includesTax?: boolean;
    taxPercentage?: number;
}

export interface StayAndPlayPackagePrices {
    twinOccupancy?: number;
    singleOccupancy?: number;
}

export interface StayAndPlayPlayer {
    sequence?: number;
    name?: string;
    email?: string;
    player?: PlayerData;
    playingGolf?: boolean;
}

export interface StayAndPlayPricing {
    id?: number;
    club?: ClubData;
    course?: ClubCourseData;
    pricingPlan?: TeeTimePricingPlan;
    discount?: TeeTimeDiscount;
}

export interface StayAndPlayRequest {
  id?: number;
  stayPlayPackage?: StayAndPlayPackage;
  player?: PlayerData;
  requesterName?: string;
  requesterEmail?: string;
  phoneNumber?: string;
  requestReference?: string;
  status?: string;
  requestedDateTime?: Date;
  noOfPax?: number;
  estimatedPrice?: number;
  totalAdjustment?: number;
  acceptedPrice?: number;
  startDate?: Date;
  endDate?: Date;
  preferredDates?: string;
  amountPaid?: number;
  specialInstructions?: string;
  chargeDetails?: StayAndPlayCharge;
    applyNonLocalPrice?: boolean;
  requestRooms?: StayAndPlayRoom[];
  requestGames?: StayAndPlayCourse[];
  stayOptionsSelected?: StayOptionSelected[];
  playOptionsSelected?: PlayOptionSelected[];
  stayAndPlayPlayers?: StayAndPlayPlayer[];
  communications?: StayAndPlayRequestComm[];
  adjustments?: StayAndPlayAdjustment[];
}

export interface StayAndPlayRequestComm {
    sequence?: number;
    from?: string;
    messageDateTime?: Date;
    message?: string;
    subject?: string;
}

export interface StayAndPlayRequestForm {
    playerId?: number;
    requesterName?: string;
    requesterEmail?: string;
    phoneNumber?: string;
    noOfPax?: number;
    preferredDates?: Date[];
}

export interface StayAndPlayRequestGroup {
    id?: number;
    requestCreatedAt?: Date;
    createdBy?: UserAuthentication;
    totalEstimatedPrice?: number;
    totalAdjustedPrice?: number;
    totalAcceptedPrice?: number;
    requests?: StayAndPlayRequest[];
}

export interface ReportList {
    allowRoles?: Array<string>;
    description?: string;
    name?: string;
    params?: any;
    reportGroup?: string;
    url?: string;
}
export interface StayAndPlayRequestPage extends PagedData<StayAndPlayRequest> {
}

export interface StayAndPlayRoom {
    id?: number;
    stayOption?: PackageStayOption;
    numberOfRooms?: number;
    numberOfGuests?: number;
    sharing?: boolean;
    startDate?: Date;
    numberOfNights?: number;
    additionalNights?: boolean;
    additionalNightsStartDate?: Date;
    instructions?: string;
    totalCharge?: number;
    amountBreakup?: RoomChargeDetails;
}

export interface StayAndPlayRoomRequest {
    sequence?: number;
    requestId?: number;
    stayOption?: number;
    nights?: number;
    sharing?: boolean;
    numberOfGuests?: number;
    additionalNights?: boolean;
    additionalNightStartDate?: Date;
    instructions?: string;
}

export interface StayAndPlayRoundSpec {
    nineHoleRounds?: number;
    eighteenHoleRounds?: number;
}

export interface StayAndPlayStayDurationSpec {
    days?: number;
    nights?: number;
    effectiveDays?: number;
    effectiveNights?: number;
}

export interface StayAndPlaySurcharge {
    surchargeName?: string;
    applicableOn?: DaySpecification;
    surchargeAmount?: number;
    includesTax?: boolean;
    taxPercentage?: number;
    additionalPrices?: StayAndPlayPackagePriceSpecification;
}

export interface StayAndPlaySurchargeForm {
    surchargeName?: string;
    applicableOn?: number[];
    surchargeAmount?: number;
    includesTax?: boolean;
    taxPercentage?: number;
    additionalCharges?: StayAndPlayPackagePriceSpecification;
}

export interface StayOptionSelected {
    sequence?: number;
    stayOption?: PackageStayOption;
    noOfNights?: number;
    startDate?: Date;
    endDate?: Date;
    additionalCharge?: number;
    taxOnAdditionalCharge?: number;
}

export interface AdditionalCharges {
    additionalUnitPrice?: number;
    additionalCharge?: number;
    taxAmount?: number;
}

export interface GameChargeDetails {
    playingOn?: Date;
    playingIn?: string;
    totalRounds?: number;
    additionalRound?: boolean;
    additionalCharges?: AdditionalCharges;
    premiumCourse?: boolean;
    premiumCharges?: PremiumCharges;
    surchargeApplicable?: boolean;
    surcharge?: StayAndPlayChargingSurcharge;
    surcharges?: StayAndPlayChargingSurcharge[];
    grossCharge?: number;
    tax?: number;
    netCharge?: number;
}

export interface PackageSurchargeApplied {
    appliedOn?: Date;
    surchargeName?: string;
    nonLocalPrice?: boolean;
    singleOccupancyPrice?: number;
    singleOccupancyCharge?: number;
    twinOccupancyPrice?: number;
    twinOccupancyCharge?: number;
    totalSurcharge?: number;
    taxPercentage?: number;
    taxAmount?: number;
}

export interface PremiumCharges {
    premiumUnitPrice?: number;
    premiumCharge?: number;
    taxAmount?: number;
}

export interface RoomChargeDetails {
    totalNights?: number;
    totalRooms?: number;
    numberOfGuests?: number;
    additionalNight?: boolean;
    addlNightCharges?: AdditionalCharges;
    premiumRoom?: boolean;
    premiumRoomCharges?: PremiumCharges;
    surcharges?: StayAndPlayChargingSurcharge[];
    grossCharge?: number;
    tax?: number;
    netCharge?: number;
}

export interface StayAndPlayCharge {
specialBaseCharge?: boolean;
    specialChargeName?: string;
    twinPackagePrice?: number;
    totalTwinPackages?: number;
    twinPackageCharge?: number;
    singlePackagePrice?: number;
    totalSinglePackages?: number;
    singlePackageCharge?: number;
    taxAmount?: number;
    surcharges?: PackageSurchargeApplied[];
    roomCharges?: RoomChargeDetails[];
    gameCharges?: GameChargeDetails[];
    amountAdjusted?: number;
    taxAdjusted?: number;
    grossCharge?: number;
    tax?: number;
    netCharge?: number;
}

export interface StayAndPlayChargingSurcharge {
    appliedOn?: Date;
    surchargeName?: string;
    surchargePrice?: number;
    surcharge?: number;
    taxAmount?: number;
}

export interface ClubTransaction {
    id?: string;
    transactionDate?: Date;
    debitOrCredit?: DebitOrCredit;
    amount?: number;
    description?: string;
    reference?: string;
    externalReference?: string;
    additionalRemarks?: string;
    currency?: CurrencyData;
    transactionType?: TransactionType;
    club?: ClubData;
    status?: string;
    transactionExport?: ClubTransactionExport;
    transactionSource?: TransactionSource;
    debitAccount?: string;
    creditAccount?: string;
    reverseTransaction?: boolean;
    transactionReversed?: string;
    reversed?: boolean;
    reversedBy?: string;
    exported?: boolean;
    exportedOn?: Date;
    exportError?: string;
}

export interface ClubTransactionExport {
    id?: number;
    trackingId?: string;
    club?: ClubData;
    exportedOn?: Date;
    totalRecords?: number;
    paidRecords?: number;
    unpaidRecords?: number;
    status?: string;
    remarks?: string;
    settledOn?: Date;
    exportedBy?: UserAuthentication;
    settledBy?: UserAuthentication;
    exportedFileUrl?: string;
    exportItems?: ClubTransactionExportItem[];
}

export interface ClubTransactionExportItem {
    id?: number;
    sequence?: number;
    transactionDate?: Date;
    transactionType?: TransactionType;
    description?: string;
    reverseTransaction?: boolean;
    debitAccount?: string;
    creditAccount?: string;
    amount?: number;
    exported?: boolean;
    exportedOn?: Date;
    exportError?: string;
    externalId?: string;
    currency?: CurrencyData;
}

export interface ClubTransactionExportPage extends PagedData<ClubTransactionExport> {
}

export interface ClubTransactionPage extends PagedData<ClubTransaction> {
}

export interface PaymentTrxnType {
    id?: number;
    club?: ClubData;
    paymentMethod?: PaymentMethod;
    paymentMethodId?: string;
    paymentGateway?: string;
    transactionType?: TransactionType;
}

export interface RefundTrxnType {
    id?: number;
    club?: ClubData;
    refundMode?: RefundMode;
    refundReason?: string;
    transactionType?: TransactionType;
}

export interface TransactionGroup {
    id?: string;
    name?: string;
    description?: string;
}

export interface TransactionSource {
    external?: boolean;
    context?: string;
    subcontext?: string;
    reference?: string;
}

export interface TransactionType {
    id?: string;
    name?: string;
    debitOrCredit?: DebitOrCredit;
    usedFor?: TransactionTypeUsedFor;
    description?: string;
    transactionGroup?: TransactionGroup;
    system?: boolean;
    club?: ClubData;
}

export interface TransactionTypeClubMap extends TransactionType {
    clubTransactionType?: string;
    debitAccount?: string;
    creditAccount?: string;
}

export interface TransactionTypes {
}

export interface TrxnTypePriceComponentMap extends TransactionType {
    component?: TeeTimePriceComponent;
}

export interface MygolfRole {
    "@class": string;
    authority?: string;
}

export interface MygolfUser {
    userId?: number;
    username?: string;
    active?: boolean;
    expires?: number;
    userType?: UserType;
    playerId?: number;
    clubId?: number;
    clubGroup?: string;
    clubs?: number[];
    organizerId?: number;
    caddyId?: number;
    partnerId?: string;
    admin?: boolean;
    email?: string;
    phone?: string;
    name?: string;
    newAuth?: boolean;
    algorithm?: string;
    combineUsername?: boolean;
    authorities?: MygolfRole[];
    mygolfAuthorities?: string[];
    profileImage?: string;
}

export interface MultipartFile extends InputStreamSource {
    name?: string;
    bytes?: any;
    empty?: boolean;
    resource?: Resource;
    size?: number;
    originalFilename?: string;
    contentType?: string;
}

export interface Period extends ChronoPeriod {
    years?: number;
    months?: number;
    days?: number;
    chronology?: IsoChronology;
}

export interface OAuth2Connection {
    scopes?: string[];
    clientId?: string;
    callbackUri?: string;
    authorizationUrl?: string;
    accessTokenUrl?: string;
    refreshTokenUrl?: string;
    clientSecret?: string;
    tokenHeaderName?: string;
    tokenPrefix?: string;
    accessToken?: string;
    refreshToken?: string;
    lastRefresh?: Date;
    tenantId?: string;
    validUntil?: Date;
    apiBaseUrl?: string;
}

export interface BasicAuthentication {
}

export interface Locale extends Cloneable {
}

export interface Comparator<T> {
}

export interface Resource extends InputStreamSource {
    open?: boolean;
    file?: any;
    readable?: boolean;
    url?: any;
    filename?: string;
    description?: string;
    uri?: URI;
}

export interface InputStreamSource {
    inputStream?: any;
}

export interface TemporalUnit {
  duration?: Duration;
  durationEstimated?: boolean;
  dateBased?: boolean;
  timeBased?: boolean;
}
export interface Record {
}

export interface IsoChronology extends AbstractChronology {
}

export interface TemporalUnit {
    dateBased?: boolean;
    timeBased?: boolean;
    duration?: Duration;
    durationEstimated?: boolean;
}

export interface ChronoPeriod extends TemporalAmount {
    negative?: boolean;
    zero?: boolean;
    chronology?: Chronology;
}

export interface OAuth2Connection {
    scopes?: string[];
    callbackUri?: string;
    authorizationUrl?: string;
    accessTokenUrl?: string;
    refreshTokenUrl?: string;
    clientSecret?: string;
    tokenHeaderName?: string;
    tokenPrefix?: string;
    accessToken?: string;
    refreshToken?: string;
    lastRefresh?: Date;
    validUntil?: Date;
    clientId?: string;
}

export interface Cloneable {
}

export interface URI {
}

export interface AbstractChronology extends Chronology {
}

export interface Duration extends TemporalAmount {
    seconds?: number;
    nano?: number;
    negative?: boolean;
    zero?: boolean;
}

export interface Chronology {
    id?: string;
    calendarType?: string;
}

export interface TemporalAmount {
    units?: TemporalUnit[];
}

export interface FacilityLocationWorkingsHoursRequest extends FacilityWorkingHoursRequest {
    locationId?: number;
}
export interface FacilityItemWorkingsHoursRequest extends FacilityWorkingHoursRequest {
    itemId?: number;
}
export interface FacilityWorkingHoursRequest {
    outletId?: number;
    dayId?: number;
    opensAt?: string;
    closesAt?: string;
}

export interface FacilityClosingTimesRequest {
    outletId?: number;
    dayId?: number;
    timeRanges?: Array<TimeRange>;
}


export type AuthFailureType = "InvalidCredentials" | "NotAPlayer" | "NotAClubMember" | "NotAClubUser" | "NotMygolfUser";

export type DayIdType = "All" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday" | "Weekday" | "Weekend" | "Holiday";

export type DayNames = "All" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Weekday" | "Weekend";

export type DebitOrCredit = "Debit" | "Credit";

export type OnClickActionType = "None" | "OpenUrl" | "OpenPage";

export type PaidFor = "Booking" | "CompetitionRegistration" | "HandicapIndex" | "NHSApplication" | "Order" | "BookingAgent" | "ClubMembership" | "Unknown";

export type PeriodType = "Day" | "Week" | "Month" | "Year";

export type RefundMode = "Cash" | "BankTransfer" | "OfflineCreditCard" | "ClubCredit" | "WalletTopup" | "M2UCredit" | "Unknown";

export type AuditChangeType = "Create" | "Update" | "Delete";

export type ClubOutletType = "DrivingRange" | "Restaurant" | "ProShop" | "SwimmingPool" | "Golf" | "Tennis" | "Badminton" | "Squash" | "SPA" | "Hotel" | "BanquetHall" | "FlowerShop" | "SlotMachine" | "CigarLounge" | "Simulator" | "GamesRoom" | "Other";

export type EInvoicingOption = "None" | "Individual" | "Company";

export type InvoiceContext = "Order" | "Booking" | "Membership" | "FacilityBooking" | "Competition" | "AgentStatement";

export type MemberChargeType = "Standard" | "Override" | "Optional";

export type MembershipChargeApplicableTo = "Primary" | "Supplementary" | "Both";

export type MembershipStatus = "Pending" | "Active" | "Inactive" | "Suspended";

export type OnMembershipSuspension = "ChangeChargeType" | "DenyClubEntry" | "DenyFacility";

export type OrderPaymentStatus = "Unpaid" | "PartiallyPaid" | "FullyPaid" | "Overpaid";

export type OrderStatus = "Generated" | "Confirmed" | "Cancelled" | "Successful";

export type OrderType = "Mixed" | "Facility" | "Tournament";

export type RecurringChargerPeriod = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Yearly";

export type SalesMode = "Cash" | "ChargeToAccount" | "CreditCard" | "DebitCard" | "EWallet" | "ChargeToRoom" | "NetBanking" | "Voucher" | "Other";

export type StatementFrequency = "Weekly" | "Monthly" | "Quarterly" | "Yearly" | "Daily";

export type TransactionStatus = "Generated" | "Posted" | "Reversed";

export type AutoDebitStatus = "Created" | "Exported" | "ResponseReceived" | "Processed";

export type CancellationReason = "OrderNotCreated" | "DepositDeadline" | "FullPaymentDeadline" | "CancelledByPlayer" | "CancelledByClub";

export type FacilityBookingStatus = "Booked" | "CancelledByClub" | "CancelledByPlayer" | "PartiallyPaid" | "FullyPaid";

export type CompetitionScorerType = "FlightMember" | "Caddie" | "HoleSpecific" | "ScorerList" | "SelfScoring";

export type FlightType = "Shotgun" | "ShotgunSplit" | "FirstHole" | "FirstHoleSplitSort" | "FirstHoleSplitNine" | "FirstHoleSplitEven";

export type OcbType = "Handicap" | "HoleRange" | "SpecificHoles" | "RoundTotal" | "PlayerTotal";

export type PlayerAdvanceType = "AllAdvance" | "TopNPlayers" | "CutOffScore";

export type ScorerSwapType = "SwapOneAndTwo" | "SwapOneAndThree" | "SwapOneAndFour";

export type ScorerType = "OwnScoring" | "FirstPlayerScoring" | "SecondPlayerScoring" | "ThirdPlayerScoring" | "FourthPlayerScoring" | "SwapBuggyScoring" | "SwapScoring";

export type WaitListStatus = "WaitListed" | "Cancelled" | "Registered";

export type BookingAgentStatementStatus = "Generated" | "Approved" | "Canceled";

export type BookingAgentTransactionType = "ChargeToAccount" | "ReverseCharge" | "WalletTopup" | "Refund" | "Payment";

export type PartnerService = "DISCOUNT" | "NGA_MEMBERSHIP" | "INSURANCE" | "BOOKING_AGENT" | "OTHER";

export type VoucherAllowedIn = "NineHoleFlight" | "EighteenHoleFlight" | "Both";

export type VoucherApplicableIn = "BOOKING" | "FNB" | "ALL";

export type VoucherType = "Raincheck9" | "Raincheck18" | "Other";

export type SyncDirection = "In" | "Out" | "Both";

export type BasePeriod = "Day" | "Month" | "Year";

export type FeatureBundlePriceType = "Flat" | "Slabbed" | "Tiered";

export type SubscriptionType = "Paid" | "Gifted" | "Trial";

export type LeagueSeasonStatus = "Created" | "Started" | "Suspended" | "Closed" | "Updated";

export type LeagueType = "Eclectic" | "Gross" | "Net" | "Stableford" | "Positional";

export type MaritalStatus = "Married" | "UnMarried" | "Unknown";

export type AmountType = "Absolute" | "Percentage" | "Fixed" | "Package";

export type BookingCommissionStatus = "None" | "Calculate" | "Recalculate" | "Success" | "Error" | "Ignored";

export type CancelPolicy = "None" | "ForfeitDeposit" | "ForfeitAmount" | "FixedAmount";

export type PricingComponentType = "Green" | "Caddy" | "Buggy" | "CaddyBooking" | "Insurance" | "Other";

export type TargetType = "ClubToPlayer" | "Club2Agent" | "Agent2Player";

export type TeeTimeBookingStatus = "Booked" | "Secured" | "CancelledByPlayer" | "CancelledByClub" | "PaymentPartial" | "PaymentFull" | "FlightRegistered" | "RefundInitiated" | "RefundCompleted";

export type TeeTimeFlightStatus = "Created" | "Assigned" | "Dispatched" | "PlayStarted" | "CrossedOver" | "Abandoned" | "PlayFinished";

export type BillStatus = "Pending" | "Paid" | "Failed";

export type ClubPaymentInstanceStatus = "Generated" | "Approved" | "Paid";

export type PaymentMappingFor = "PaymentRecorded" | "PaymentReceived" | "GatewayCommission";

export type PaymentSetupFor = "PaymentRecorded" | "PaymentReceived" | "GatewayCommission";

export type RevenueType = "BookingCommission" | "StayAndPlay" | "Competition" | "CardMemberCommission";

export type StayAndPlayRequestStatus = "Draft" | "Generated" | "WaitingCustomerResponse" | "WaitingOwnerResponse" | "Rejected" | "Expired" | "Approved" | "Booked" | "Reversed" | "CustomerCancelled";

export type TransactionTypeUsedFor = "PricingComponent" | "RoundingAdj" | "Discount" | "CardDiscount" | "Voucher" | "Waiver" | "Refund" | "Penalty" | "Tax" | "OnlinePayment" | "OfflinePayment" | "CashPayment" | "ChargeToAccount" | "Wallet" | "ClubMembership" | "RedeemCredit" | "Commission" | "Merchandise";

export type GameRoundStatus = "Pending" | "InProgress" | "Completed";

export type PlayerRoundStatus = "Pending" | "InProgress" | "Completed" | "Withdrawn";

export type UserType = "Britesoft" | "Player" | "Organizer" | "Club" | "ClubGroup" | "Admin" | "Caddy" | "Partner" | "Unknown";

export type CompetitionPlayerStatus = "Registered" | "NoShow" | "Withdrawn" | "FailedCutoff" | "Disqualified";

export type EmailStatus = "Queued" | "Error" | "Sent" | "Rejected";

// export type ClubMembershipStatus = "Pending"| "Active"| "Inactive"| "Suspended"| "Rejected";

export class ClubMembershipStatus {
    public static PENDING   =   "Pending";
    public static ACTIVE    =   "Active";
    public static INACTIVE  =   "Inactive";
    public static SUSPENDED =   "Suspended";
    // public static REJECTED  =   "Rejected";
}

export class ColorTeeTimeBookingStatus {
    public static BOOKED = "Red";
    public static CANCELLEDBYPLAYER = "Grey";
    public static CANCELLEDBYCLUB = "Grey";
    public static PAYMENTPARTIAL = "Orange";
    public static PAYMENTFULL = "#30bb5b";
}


export class ColorOrderStatus {
    public static GENERATED = "Red";
    public static CANCELLED = "Grey";
    public static CONFIRMED = "Orange";
    public static SUCCESSFUL = "#30bb5b";
}

export class ColorOrderPaymentStatus {
    public static UNPAID = "Red";
    // public static CANCELLED = "Grey";
    public static PARTIALLYPAID = "Orange";
    public static OVERPAID = "Orange";
    public static FULLYPAID = "#30bb5b";
}

export interface BuggySchedule {
    startDate?: string;
    endDate?: string;
    availabilities?: Availabilities[];
}
export interface CaddySchedule {
    startDate?: string;
    endDate?: string;
    availabilities?: Availabilities[]; //Array<CaddyAvailable>;
}

export interface Availabilities {
    available?: boolean;
    availableOn?: string;
    reason?: string;
    weeklyHoliday?: boolean;
}


export interface WidgetMenuItems {
  key?: string;
  name?: string;
  hide?: boolean;
  userAuthority?: Array<string>;
  userRoles?: Array<string>;
  urlRoute?: string;
  homeItem?: string;
  sequence?: number;
}


export interface HomeItemIcon {
  id?: number;
  homeItem?: string;
  club?: ClubDataLite;
  partner?: DiscountCompany;
  iconUrl?: string;
  itemShape?: string;
}

export interface UserHomeItem {
  id?: number;
  user?: UserDataLite;
  homeItem?: string;
  hide?: boolean;
  sequence?: number;
}

export class BookingAgentTrxnTypeName {
    public static "ChargeToAccount" = "Charged to Account"
    public static "ReverseCharge" = "Reversed Charge to Account"
    public static "WalletTopup" = "Wallet Topup"
    public static "Refund" = "Refund"
    public static "Payment" = "Payment";

}
export class OutletItemType {
    public static "Badminton"       = "Court";
    public static "Banquet Hall"    = "Hall";
    public static "Cigar Lounge"    = "Lounge";
    public static "Driving Range"   = "Bay";
    public static "Flower Shop"     = "Lot";
    public static "Golf"            = "Course";
    public static "Hotel/Villa"     = "Room";
    public static "Other"           = "Item";
    public static "Pro Shop"        = "Shop";
    public static "Restaurant"      = "Table";
    public static "Sauna"           = "Room";
    public static "Slot Machine"    = "Machine";
    public static "Squash"          = "Court";
    public static "Swimming Pool"   = "Pool";
    public static "Tennis"          = "Court";
    public static "Games Room"      = "Room";
    public static "Simulator"       = "Room";
}
export class PlayerTypes {
    public static STD       =   "Visitor";
    public static ARMY      =   'Armed Forces';
    public static GOVT      =   "Government";
    public static GUEST     =   "Member's Guest";
    public static JUNIOR    =   "Junior";
    public static MEMBER    =   "Member";
    public static POLICE    =   "Police";
    public static SENIOR    =   "Senior";
    public static STAFF     =   "Staff";
    public static TMEMBER   =   "Term Member";
    public static WOMAN     =   "Women";
    public static LADIES    =   "Ladies";
    public static PGUEST    =   "Privileged Guest";
    public static GOLFPRO   =   "Golf Professional";
}

export class PaymentMethods {
    public static cash           =	"Cash";
    public static offcc          =	"Offline Credit Card";
    public static offl           =	"Offline Payment";
    public static offnb          =	"Netbanking (Offline)";
    public static online         =	"Online Payment";
    public static redmcc         =	"Redeem Club Credit";
    public static chgacc         =  "Charge to Account";
    public static cwlt           =  "Club eWallet";
    public static chgrom         =  "Offline Charge to Room";

}

export class DayNameId {
    public static "0"   =   "All Days";
    public static "1"   =   "Monday";
    public static "2"   =   "Tuesday";
    public static "3"   =   "Wednesday";
    public static "4"   =   "Thursday";
    public static "5"   =   "Friday";
    public static "6"   =   "Saturday";
    public static "7"   =   "Sunday";
    public static "8"   =   "Weekday";
    public static "9"   =   "Weekend";
    public static "10"  =   "Public Holiday";
}

export class DayNameValue {
    public static "All"   =   "All Days";
    public static "Monday"   =   "Monday";
    public static "Tuesday"   =   "Tuesday";
    public static "Wednesday"   =   "Wednesday";
    public static "Thursday"   =   "Thursday";
    public static "Friday"   =   "Friday";
    public static "Saturday"   =   "Saturday";
    public static "Sunday"   =   "Sunday";
    public static "Weekday"   =   "Weekday";
    public static "Weekend"   =   "Weekend";
    public static "PublicHoliday"  =   "Public Holiday";
}

export class CancellationReasonValue {
    public static "OrderNotCreated" = "Order was not created";
    public static "DepositDeadline" = "Deadline for Deposit";
    public static "FullPaymentDeadline" = "Deadline for Full Payment";
    public static "CancelledByPlayer"   = "Cancelled by Player";
    public static "CancelledByClub" = "Cancelled by Club";

}

export class FacilityBookingStatusValue {
    public static "Booked" = "Booked";
    public static "CancelledByClub" = "Cancelled by Club";
    public static "CancelledByPlayer" = "Cancelled by Player";
    public static "PartiallyPaid" = "Partially Paid";
    public static "FullyPaid" = "Paid In Full";
}

export class TeeTimeFlightStatusSort {
    public static "Created" = 0
    public static "Assigned" = 0
    public static "Dispatched" = 1
    public static "PlayStarted" = 2
    public static "CrossedOver" = 3
    public static "PlayFinished" = 4
    public static "Abandoned" = 5

}
export function createClubCustomerForm(): ClubCustomerForm {
    return {
        address1: "",
        address2: "",
        city: "",
        state: "",
        postalCode: "",
        fax: "",
        phoneNumbers: [],
        website: "",
        email: "",
        country: "",
        customerCode: "",
        customerName: "",
        customerEmail: "",
        customerPhone: "",


    }
}

export function createGameRoundInfo(): GameRoundInfo {
    return {
        id           : 0,
        roundNo      : 1,
        status       : "Pending",
        inProgress   : false,
        nextRound    : false,
        grossTotal   : 0,
        netPosition  : 0,
        grossPosition: 0,
        publishFlights: false,
    };
}

export class PlayerDisplay {
    playerName: string;
    nineTotal: number;
    nineNetTotal: number;
    scores: Array<PlayerScore>;
    totalScore: number;
    playerId: number;
    handicap: number;
    whichNine: number;
    playerRound: PlayerRoundScores;
}
export class PlayerTotals {
    playerName: string;
    handicap: number;
    firstNineGross: number;
    secondNineGross: number;
    firstNineNet: number;
    secondNineNet: number;
    totalGross: number;
    totalNet: number;
    playerRound: PlayerRoundScores;
}
export class CourseDisplay {
    courseName: string;
    whichNine: number;
    holes: Array<CourseHoleInfo>;
    players: Array<PlayerDisplay>;
    coursePar: number;
    indexToUse?: number;
}


export interface FlightMoreData extends FlightData {
    playerFlight?: boolean
}

export function createClubList(): ClubList {
    return {
        totalPages: 0,

        currentPage: 0,

        totalItems: 0,

        totalInPage: 0,

        success: true,
        clubs: []
    }
}

export function createClubInfo(): ClubInfo {
    return {
        clubId: 0,
        clubName: '',
        clubImage: 'img/default_club.png',
        clubTag: '',
        latitude: 0,
        longitude: 0,
        address: '',
        description: '',
        virtualClub: false
    }
}

export function createCourseInfo(): CourseInfo {
    return {
        // courseName: "",

        coursePar: 0,

        photoUrl: "",

        holes: [],
        courseId: 0,
        indexToUse: 1,
        teeBoxes: [],
    }
}

/**
 * Creates an instance of PlainScorecard
 * @param competition
 * @returns {{success: boolean, clientId: any, competition: boolean, playerRoundScores: any[]<PlayerRoundScores>, courses: any[]<CourseInfo>, finished: boolean}}
 */
export function createScorecard(competition: boolean) {
    return {
        success: true,
        clientId         : util.generateUUID(),
        competition: competition,
        playerRoundScores: new Array<PlayerRoundScores>(),
        courses: new Array<CourseInfo>(),
        finished: false
    };

}

export class ClubHelpItem {
    server?: string;
    url?: string;
}

const nullOrEmptyString = "";
const nullValue = null;
const currentDate = moment().toDate();
export function createLocalOrder(): OrderExtended {
    return {
        id: -999999,// nullValue,
        clientId: null, //global.generateUUID(),
        club: nullValue,
        orderNumber: nullOrEmptyString,
        invoiceNumber: nullOrEmptyString,
        orderDate: currentDate,
        status: 'Generated',
        paymentStatus: 'Unpaid',
        orderAmount: nullValue,
        taxAmount: nullValue,
        discountGiven: nullValue,
        roundingAdj: nullValue,
        amountPayable: nullValue,
        refundAmount: nullValue,
        amountPaid: nullValue,
        orderCompletedAt: nullValue,
        orderCancelledAt: nullValue,
        createdBy: nullValue,
        cancelledBy: nullValue,
        taxProfile: nullValue,
        taxProfileId: nullOrEmptyString,
        orderUser: nullValue,
        partner: nullValue,
        clubCustomer: nullValue,
        player: nullValue,
        customerName: nullOrEmptyString,
        customerEmail: nullOrEmptyString,
        customerPhone: nullOrEmptyString,
        customerGender: nullOrEmptyString,
        orderPayments: [],
        orderItems: [],
        refunds: [],
        bookings: [],
    };

}

export function createClubFacility(): ClubOutletForm {
    return {
        name: nullOrEmptyString,
        description: nullOrEmptyString,
        outletType: nullOrEmptyString,
        active: true,
        bookableFacility: true,
        displayToPublic: true,
        // minBookingDuration: null,
        minBookingDuration: {
            duration: 1,
            durationUnit: "HOUR",
        },
        address1: nullOrEmptyString,
        address2: null,
        city: null,
        state: null,
        postalCode: null,
        fax: null,
        phoneNumbers: null,
        website: null,
        email: null,
        country: 'MYS',
        primaryPhone: null,
        phone1: null,
        phone2: null,
    }
}
const initBookingDuration = {
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0
}
export function createFacilityBookingRules(): FacilityBookingRules {
    return {
        finishOrderIn: initBookingDuration,
        paymentIn: initBookingDuration,
        depositAmount: 0,
        depositBefore: initBookingDuration,
        depositType: 'Absolute',
        fullPaymentBefore: initBookingDuration,
    }
}

export function createFacilityClosure(): FacilityClosure {
    return {
        closureStartDate: moment().format("YYYY-MM-DD"),
        closureEndDate: moment().format("YYYY-MM-DD"),
        wholeDay: false,
        startTime: moment().format("HH:mm"),
        endTime: moment().format("HH:mm"),
        closureReason: '',
        // facility: ClubOutlet,
        // facilityLocation: ClubFacilityItemLocation,
        // facilityItem: ClubFacilityItem,
    }
}


export function createFacilityPricingForm(): FacilityPricingForm {
    return {
        name: '',
        description: '',
        taxProfile: null,
        pricingUnit: {
            durationBased: true,
            paxBased: false,
            countBased: false,
            durationUnit: 'hour',
            baseDurationSize: 1,
            countSize: null,
        },
        unitPrice: null,
        countPrice: null,
        amUnitPrice: null,
        amCountPrice: null,
        pmUnitPrice: null,
        pmCountPrice: null,

    }
}

export function initClubAgentSetting(): BookingAgentClubSetting {
    return {
        id: null,
        discountCompany: null,
        clubData: null,
        active: false,
        maxBookingsPerDay: 0,
        maxUnpaidBookings: 0,
        allowCredit: false,
        creditLimit: 0,
        balance: null,
        bookingCommissionType: null,
        bookingCommission: 0,
        allowBookingUnopenedSlots: true,
        paymentRules: initClubAgentPaymentRules(),

    }
}

export function initClubAgentPaymentRules(): BookingAgentPaymentRules {
    return {
        paymentIn: {
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
        },
        depositBefore: {
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
        },
        depositType: 'Absolute',
        depositAmount: 0,
        fullPaymentBefore: {
            months: 0,
            days: 0,
            hours: 0,
            minutes: 0,
        },
    }
}

export interface ExtClubData extends ClubDataPage {
    clubs: Array<ClubData>
  }

export function createClubDataPage(): ExtClubData  {
    return {
        totalPages: 0,
        currentPage: 0,
        totalItems: 0,
        totalInPage: 0,
        success: true,
        items  : [],
        clubs: []
    }
}


export interface AddlBookingPlayers {
    searchById?: number;
    searchByMembership?: string;
    playerName?: string;
    playerId?: number;
    image?: string;
    profile?: string;
    phone?: string;
    player?: any;
    email?: string;
    address?: any;
  }

export function createAddlBookingPlayers(length): AddlBookingPlayers {
    return {
      searchById: null,
      searchByMembership: '',
      playerName: `Guest ${length}`,
      playerId: null,
      image: null,
      profile: null,
      phone: null,
      player: null,
      email: '',
      address: {},


    }
  }

  export interface currencies {
    id: string;
    name: string;
    symbol: string;
  }


export function initEInvoicingEntity(): EInvoicingEntity {
  return {
    id: null, // number;
    name: '', // string;
    taxIdentificationNumber: '', // string;
    individual: true, // boolean;
    businessRegistrationNumber: '', // string;
    sst: '', // string;
    tourismNumber: '', // string;
    country: {}, // CountryData;
    address: {}, // AddressData;
    markForDelete: false, // boolean;
    idType: '', // string;
    idValue: '', // string;
  }
}

export function initEInvoicingEntityForm(): EInvoicingEntityForm {
  return {
    incomeTaxNumber: '', // string;
    individual: true, // boolean;
    companyName: '', // string;
    businessRegistrationNumber: '', // string;
    sst: '', // string;
    tourismNumber: '', // string;
    idType: '', // string;
    idValue: '', // string;
  }
}


export function emptyCompetitionDataPage(): CompetitionDataPage {
  return {
    totalPages: 0,
    currentPage: 0,
    totalItems: 0,
    totalInPage: 0,
    success: false,
    items: new Array<MergedCompetitionDetails>(),
  };
}

export function emptyCompetitionDataLitePage(): CompetitionDataLitePage {
  return {
    totalPages: 0,
    currentPage: 0,
    totalItems: 0,
    totalInPage: 0,
    success: false,
    items: new Array<CompetitionDataLite>(),
  };
}

export type MergedCompetitionDetails = CompetitionInfo & CompetitionData;

export class CompPlayerParticipation {
  public static P  =   "Player";
  public static N  =   "N";
  public static B  =   "B";
}

export class CompClubTypes {
  public static All  =   "All";
  public static Favourites  =   "Favourites";
  public static Membership  =   "Membership";
  public static Nearby  =  "Nearby";
  public static Specific  = "Specific"
}

export type CompStatus = "Upcoming" | "In Progress" | "Completed" | "Cancelled";


export function createOrganizerDataPage(): OrganizerDataPage  {
  return {
      totalPages: 0,
      currentPage: 0,
      totalItems: 0,
      totalInPage: 0,
      success: true,
      items  : [],
  }
}

export class StayPlayStatus {
  public static DFT = "Draft";
  public static GEN = "Generated";
  public static WCR = "WaitingCustomerResponse";
  public static WOR = "WaitingOwnerResponse";
  public static REJ = "Rejected";
  public static EXP = "Expired";
  public static APP = "Approved";
  public static BKD = "Booked";
  public static REV = "Reversed";
  public static CCL = "CustomerCancelled";
}


export function createPlayerList() {
    return {
        players: new Array<PlayerInfo>(),
        totalPages: 0,
        currentPage: 0,
        totalItems: 0,
        totalInPage: 0,
        success: false,
        errorMessage: ''
    }
}