/* tslint:disable */
// Generated using typescript-generator version 2.9.456 on 2022-09-15 11:53:29.

import * as util from "../util";
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

export interface AuthenticationResult {
    success?: boolean;
    name?: string;
    user?: UserInfo;
    authToken?: string;
    exception?: string;
    failureType?: AuthFailureType;
    clubMembership?: ClubMembership;
}

export interface BaseResult {
    success?: boolean;
    message?: string;
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
    clubId?: number;
    clubName?: string;
    clubImage?: string;
    clubThumbnail?: string;
    clubLogo?: string;
    clubTag?: string;
    latitude?: number;
    longitude?: number;
    averageRating?: number;
    address?: string;
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
}

export interface ClubList extends PagedResult {
    clubs?: ClubInfo[];
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
    startTime?: Date;
    actualStartTime?: Date;
    groupName?: string;
    roundSessionId?: number;
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
    status?: GameRoundStatus;
    deriveHandicap?: boolean;
    createdOn?: Date;
    createdBy?: string;
    club?: ClubData;
    gameRoundCourses?: GameRoundCourseData[];
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

export interface OfflinePayment {
    currency?: string;
    paidByName?: string;
    paidByEmail?: string;
    paidByPhone?: string;
    paymentMethod?: string;
    amount?: number;
    remarks?: string;
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
    bill_type_id?: number;
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

export interface PaymentLogoInfo {
    thumb_url?: string;
    avatar_url?: string;
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
    playedOn?: Date;
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
    bookingId?: number;
    flightMembers?: FlightMember[];
} 

export interface PlainScorecardPage extends PagedData<PlainScoreCard> {
}

export interface PlayerInFlightData {
    id?: number;
    groupName?: string;
    startingHole?: number;
    player?: PlayerData;
    team?: TeamData;
    buggy?: string;
    scorer?: PlayerData;
    handicap?: number;
    handicapIndex?: number;
    handicapStatus?: string;
    status?: PlayerRoundStatus;
    keepFlight?: boolean;
    actualStartTime?: Date;
    ocbApplication?: OcbAppliedData;
    categoryOcbApplication?: OcbAppliedData;
    teeBox?: TeeBoxData;
    playerTotals?: PlayerTotalData[];
    scores?: PlayerScoreData[];
    completed?: boolean;
    inProgress?: boolean;
    withdrawn?: boolean;
    pending?: boolean;
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
    playerRefunded?: PlayerData;
    club?: ClubData;
    refundIssuedBy?: UserAuthentication;
    transaction?: ClubTransaction;
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
    scorecards?: PlainScoreCard[];
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
    searchType?: string;
    clubId?: number;
    playedBy?: string;
    playedAt?: string;
}

export interface SearchCriteria {
    searchType?: string;
    onlyParticipating?: boolean;
    onlyFavorites?: boolean;
    searchWithinDistance?: boolean;
    clubId?: number;
    maxDistance?: number;
    clubsWithMembership?: boolean;
    searchText?: string;
    periodLength?: number;
    periodType?: string;
    countryId?: string;
    organizerId?: number;
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

export interface UserInfo {
    userId?: number;
    userName?: string;
    password?: string;
    name?: string;
    userType?: UserType;
    admin?: boolean;
    clubId?: number;
    playerId?: number;
    organizerId?: number;
    caddieId?: number;
    partnerId?: string;
    roles?: string[];
}

export interface ValidationResult {
    valid?: boolean;
    validationMessage?: string;
}

export interface AdFormData {
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
    available?: boolean;
    availabilityDays?: { [index: string]: boolean };
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
    firstName?: string;
    lastName?: string;
    gender?: string;
    dateOfBirth?: Date;
    identificationNo?: string;
    status?: string;
    grade?: number;
    dateJoined?: Date;
    qcode?: string;
    description?: string;
    nationality?: string;
    photo?: MultipartFile;
    availability?: boolean[];
}

export interface CaddyAssignment {
    id?: number;
    assignmentDate?: Date;
    assignmentStart?: Date;
    assignmentEnd?: Date;
    totalMinutes?: number;
    flightAssigned?: TeeTimeFlight;
    timeBooking?: TeeTimeBooking;
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
    available?: boolean;
    availabilityDays?: { [index: string]: boolean };
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

export interface ClubCourseData {
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
    holes?: ClubCourseHoleData[];
    teeBoxes?: CourseTeeBoxData[];
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

export interface ClubCredit {
    club?: ClubData;
    currency?: CurrencyData;
    balance?: number;
    walletBalance?: number;
}

export interface ClubData {
    id?: number;
    name?: string;
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
}

export interface ClubDataLite {
    clubId?: number;
    clubName?: string;
    clubImage?: string;
    clubThumbnail?: string;
    clubLogo?: string;
    countryId?: string;
    countryName?: string;
}

export interface ClubDataLitePage extends PagedData<ClubDataLite> {
}

export interface ClubDataPage extends PagedData<ClubData> {
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
    frequency?: StatementFrequency;
    dayOfMonth?: number;
}

export interface ClubMembership {
    id?: number;
    club?: ClubData;
    membershipType?: ClubMembershipType;
    membershipNo?: string;
    player?: PlayerData;
    joinedOn?: Date;
    validUntil?: Date;
    depositAmountPaid?: number;
    primaryMembership?: boolean;
    status?: MembershipStatus;
    playerApproval?: boolean;
    active?: boolean;
    playerHomeClub?: boolean;
    statementEmail?: boolean;
    supplementaryContext?: string;
    correspondenceEmail?: string;
    lastUpdatedBy?: UserAuthentication;
    lastUpdatedAt?: Date;
    onSuspension?: OnMembershipSuspension;
    playerTypeApplied?: string;
    guestsWhenSuspended?: number;
    deniedFacilities?: string[];
    suspensionRemarks?: string;
    memberImage?: string;
    additionalProperties?: { [index: string]: any };
    statusHistories?: ClubMembershipStatusHistory[];
    additionalCharges?: ClubMembershipAddlChg[];
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
}

export interface ClubMembershipChargePage extends PagedData<ClubMembershipCharge> {
}

export interface ClubMembershipOption {
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
    outletType?: string;
    active?: boolean;
    address?: AddressData;
    club?: ClubData;
    outletUsers?: UserAuthentication[];
}

export interface ClubOutletForm extends AddressForm {
    name?: string;
    description?: string;
    outletType?: string;
    active?: boolean;
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
    club?: ClubData;
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
    salesMode?: string;
    club?: ClubData;
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
    payments?: ClubPosPayment[];
}

export interface ClubPosSalePage extends PagedData<ClubPosSale> {
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

export interface ClubSalesForm {
    salesDate?: Date;
    salesTime?: Date;
    billNo?: string;
    remarks?: string;
    grossAmount?: number;
    discountAmount?: number;
    taxApplied?: number;
    netAmount?: number;
    salesMode?: string;
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
    standardAmount?: number;
    chargedAmount?: number;
}

export interface IAvailableOnDay {
}

export interface MemberPaymentOption {
    suspendOnPaymentDefault?: boolean;
    playerTypeOnSuspension?: string;
    gracePeriod?: PeriodType;
    gracePeriodLength?: number;
    deductFromDeposit?: boolean;
}

export interface NearbyClub {
    location?: LocationData;
    club?: ClubData;
    distanceInKm?: number;
}

export interface PlayerAccountStat {
    player?: PlayerDataLite;
    yearMonth?: string;
    statementAmount?: number;
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
    includeTransactionUntil?: Date;
    balanceBroughtForward?: number;
    paymentReceived?: number;
    totalDebits?: number;
    totalCredits?: number;
    closingBalance?: number;
    approved?: boolean;
    createdAt?: Date;
    approvedAt?: Date;
    approvedBy?: UserAuthentication;
    club?: ClubData;
    player?: PlayerData;
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
    chargeId?: string;
    transactionGenerated?: boolean;
    transactionId?: string;
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

export interface RefundFromClub {
    transactionDate?: Date;
    reference?: string;
    referenceDate?: Date;
    chargeType?: string;
    description?: string;
    amount?: number;
}

export interface Schedule {
    startDate?: Date;
    endDate?: Date;
    availabilities?: Availability[];
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

export interface AddPlayerRoundData {
    flightNo?: string;
    teeOffTime?: Date;
    holeNo?: number;
    scorerId?: number;
    buggy?: string;
}

export interface CompRoundSessionData {
    id?: number;
    roundId?: number;
    startTime?: Date;
    maxSlots?: number;
    compPlayers?: CompetitionPlayerData[];
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
    createdBy?: string;
}

export interface CompetitionData {
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
    fee?: number;
    totalPrize?: number;
    rules?: string;
    tieBreaker?: string;
    maxPlayers?: number;
    totalRounds?: number;
    totalHoles?: number;
    type?: string;
    multiplePrizes?: boolean;
    scoringFormat?: ScoringFormatData;
    handicapFormat?: ScoringFormatData;
    teeBoxMen?: TeeBoxData;
    teeBoxWomen?: TeeBoxData;
    status?: string;
    createdOn?: Date;
    createdBy?: string;
    allowGps?: boolean;
    considerScoreType?: string;
    autoStart?: number;
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
    handicapSystems?: HandicapSystem[];
    club?: ClubData;
    organizer?: OrganizerData;
    invitation?: CompetitionInvitationData;
    gameRounds?: GameRoundData[];
    categories?: CompetitionCategoryData[];
    prizes?: CompetitionPrizeData[];
    sponsors?: CompetitionSponsorData[];
    players?: CompetitionPlayerData[];
    advertisements?: CompetitionAdData[];
    ocbs?: CompetitionOcbData[];
    invitees?: CompetitionInviteeData[];
}

export interface BuildFactory {
}

export interface CompetitionDataPage extends PagedData<CompetitionData> {
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
    ocbApplication?: OcbAppliedData;
    ocbCategoryApplication?: OcbAppliedData;
    clubMemberAccount?: string;
}

export interface CompetitionPlayerInfo {
    playerId?: number;
    playerName?: string;
    handicap?: number;
    photoUrl?: string;
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
}

export interface CompetitionPrizeData {
    id?: number;
    category?: PlayerCategoryData;
    roundInfo?: CompetitionRoundData;
    order?: number;
    prizePosition?: number;
    prize?: PrizeData;
    winnerData?: PrizeWinnerData;
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
}

export interface CompetitionRoundData {
    roundId?: number;
    roundNo?: number;
    status?: GameRoundStatus;
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

export interface FlightGenerationOption {
    competition?: number;
    playerOrderBy?: string;
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

export interface LeaderBoard {
    competionName?: string;
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
    playerId?: number;
    position?: string;
    playerName?: string;
    firstName?: string;
    imageURL?: string;
    handicap?: number;
    toPar?: number;
    parCap?: number;
    round1Gross?: number;
    round2Gross?: number;
    round3Gross?: number;
    round4Gross?: number;
    round1Net?: number;
    round2Net?: number;
    round3Net?: number;
    round4Net?: number;
    outTotalGross?: number;
    inTotalGross?: number;
    totalGross?: number;
    actualTotalGross?: number;
    outTotalNet?: number;
    inTotalNet?: number;
    totalNet?: number;
    actualTotalNet?: number;
    totalNetAdj?: number;
    modifiedTotalNet?: number;
    onHole?: string;
    thru?: string;
    ocb?: string;
    startTime?: Date;
    countryId?: string;
    sportCode?: string;
    flagUrl?: string;
    lastName?: string;
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

export interface ScoringFormatData {
    id?: number;
    name?: string;
    adjustmentFactor?: number;
    usedFor?: string;
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
    partnerServices?: PartnerService[];
    country?: CountryData;
    address?: AddressData;
}

export interface DiscountCompanyForm extends AddressForm {
    id?: string;
    name?: string;
    description?: string;
    partnerServices?: PartnerService[];
    partnerImage?: MultipartFile;
}

export interface DiscountCompanyPage extends PagedData<DiscountCompany> {
}

export interface DiscountCompanyProgram {
    id?: string;
    discountCompany?: DiscountCompany;
    name?: string;
    description?: any;
    launchedOn?: Date;
    validFrom?: Date;
    validUntil?: Date;
    amountType?: AmountType;
    discountAmount?: number;
}

export interface DiscountCompanyProgramPage extends PagedData<DiscountCompanyProgram> {
}

export interface DiscountPlayerClub {
    playerDiscountProgram?: PlayerDiscountProgram;
    club?: ClubData;
    teeTimeDiscount?: TeeTimeDiscount;
    verified?: boolean;
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
    document?: string;
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
    priceComponents?: TeeTimePriceComponent[];
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
    priceComps?: TeeTimeVoucherPriceComp[];
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
    phone1?: string;
    phone2?: string;
    primaryPhone?: string;
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
    availability?: boolean[];
    buggyImage?: MultipartFile;
    buggyDate?: BuggyData;
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
    virtualClub?: boolean;
    clubType?: any;
    contactPerson?: string;
    contactEmail?: string;
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
}

export interface ClubMembershipForm {
    membershipNo?: string;
    membershipType?: string;
    joinedOn?: Date;
    validUntil?: Date;
    depositAmountPaid?: number;
    statementEmail?: boolean;
    correspondenceEmail?: string;
    memberImage?: MultipartFile;
    homeClub?: boolean;
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
    term?: boolean;
}

export interface ClubRegistrationForm extends AddressForm {
    name?: string;
    shortName?: string;
    virtualClub?: boolean;
    handicapSystem?: string;
    timezone?: string;
    clubLogo?: MultipartFile;
    firstName?: string;
    lastName?: string;
    contactEmail?: string;
    representativePhone?: string;
    password?: string;
    representativePhoto?: MultipartFile;
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
    teeBoxForMen?: string;
    teeBoxForWomen?: string;
    maxHandicapMen?: number;
    maxHandicapWomen?: number;
    paymentMandatory?: boolean;
    competitionCharge?: number;
    handicapPreference?: string[];
    downloadHandicap?: boolean;
    autoStart?: boolean;
    autoStartBefore?: number;
    logo?: MultipartFile;
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
    order?: number;
}

export interface CompetitionRoundForm {
    roundDate?: Date;
    name?: string;
    description?: string;
    deriveHandicap?: boolean;
    totalNines?: number;
    courses?: GameCourseForm[];
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
    handicapIndexDate?: Date;
    calculatedOn?: Date;
    player?: PlayerDataLite;
    totalRoundsRead?: number;
    totalAverageDifferentialsUsed?: number;
    averageValue?: number;
    handicapFactor?: number;
    initialHandicapIndex?: number;
    nineHoleHandicap?: boolean;
    lowHandicapStartDate?: Date;
    lowHandicapEndDate?: Date;
    lowHandicapIndex?: number;
    handicapIndexAfterSoftCap?: number;
    handicapIndexMovement?: number;
    handicapIndexAfterHardCap?: number;
    handicapIndex?: number;
    gameRounds?: HandicapGameRound[];
}

export interface HandicapGameRound {
    playerRoundId?: number;
    nineHoles?: boolean;
    clubName?: string;
    roundDate?: Date;
    startTime?: Date;
    totalHolesPlayed?: number;
    rating?: CourseSlopeRating;
    courseHandicap?: number;
    handicapIndex?: number;
    competitionRound?: boolean;
    competitionName?: string;
    teeBoxId?: number;
    teeBoxName?: string;
    courseNames?: string[];
    scores?: HandicapScore[];
    sortGroup?: number;
    totalActualGrossScore?: number;
    totalGrossScore?: number;
    totalAdjustedScore?: number;
    pccAdjustment?: number;
    scoreDifferential?: number;
    esr?: number;
    cumulativeESR?: number;
    used?: boolean;
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

export interface LeagueLeaderboard {
    leagueRound?: LeagueRound;
    playerRounds?: EclecticPlayerRound[];
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
}

export interface LowestAverageGrossLeaderboard {
    leagueSeason?: string;
    totalRounds?: number;
    totalFinished?: number;
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
    club?: ClubData;
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
    address?: AddressData;
    userId?: number;
    userName?: string;
    userProfile?: UserProfile;
    addresses?: UserAddress[];
    deleteRequested?: boolean;
    deleteRequestedOn?: Date;
    accountDeleted?: boolean;
    accountDeletedOn?: Date;
    addedByClub?: ClubData;
    membership?: ClubMembership;
}

export interface PlayerDataLite {
    playerId?: number;
    playerName?: string;
    playerPhoto?: string;
    countryId?: string;
    countryName?: string;
}

export interface PlayerDataLitePage extends PagedData<PlayerDataLite> {
}

export interface PlayerDataPage extends PagedData<PlayerData> {
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
    defaultHandicapSystem?: string;
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
    deleteRequested?: boolean;
    deleteRequestedOn?: Date;
    deleted?: boolean;
    deletedOn?: Date;
    addedByClub?: ClubInfo;
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
    startTime?: Date;
    actualStartTime?: Date;
    frontNineNetTotal?: number;
    backNineNetTotal?: number;
    totalNetScore?: number;
    totalNetAdjustedScore?: number;
    diffNetToPar?: number;
    scores?: PlayerScore[];
    totals?: PlayerTotals[];
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
}

export interface PlayerTotals {
    whichNine?: number;
    grossTotal?: number;
    netTotal?: number;
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

export interface BookingCount {
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
    paidFor?: string;
    payments?: OfflinePayment[];
}

export interface BookingPayment {
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

export interface BookingPriceDeduction {
    bookingPlayerId?: number;
    component?: string;
    componentName?: string;
    itemCount?: number;
    unitPrice?: number;
    itemPrice?: number;
}

export interface BookingRefund {
    playerRefunded?: PlayerData;
    refundDate?: Date;
    refundAmount?: number;
    refundMode?: RefundMode;
    description?: string;
}

export interface BookingRequestDetails {
    reference?: string;
    request?: TeeTimeSlotBookingRequest;
    playerId?: number;
    authenticationId?: number;
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

export interface BuggyCaddiePreference {
    bookingId?: number;
    ignoreBuggyUpdate?: boolean;
    ignoreCaddieUpdate?: boolean;
    playerPairings?: PlayerBuggyCaddiePreference[];
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
    refundAmount?: number;
    refundSplits?: BookingRefund[];
    walletReverts?: BookingWalletRevert[];
}

export interface ClubTeeTimeSlots {
    club?: ClubData;
    distance?: number;
    distanceFrom?: LocationData;
    slots?: TeeTimeSlotDisplay[];
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

export interface PlayerBuggyCaddiePreference {
    bookingPlayerId?: number;
    assignedBuggy?: number;
    buggyRequired?: boolean;
    buggyPairing?: number;
    driving?: boolean;
    caddyRequired?: boolean;
    caddieAssigned?: number;
    caddiePreferred?: number;
    caddyPairing?: number;
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
}

export interface SlotTemplateKey {
    dayName?: string;
    teeOffTime?: Date;
}

export interface SlotUpdateSpec {
    allowWalking?: string;
    availableForBooking?: string;
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
    depositBy?: Date;
    fullPaymentBy?: Date;
    additionalItems?: TeeTimeBookingAdditionalItem[];
    commissionStatus?: BookingCommissionStatus;
    commissionCalculationError?: string;
    bookingMedium?: string;
    pricingPlanApplied?: string;
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
    driving?: boolean;
    caddyPairing?: number;
    caddyPreferred?: CaddyData;
    caddySelectionCriteria?: CaddySelectionCriteria;
    caddyAssigned?: CaddyData;
    buggyId?: number;
    estimatedArrivalTime?: Date;
    playerRemoved?: boolean;
    playerHasInsurance?: boolean;
    teeTimeBookingFnbs?: TeeTimeBookingFnb[];
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
}

export interface TeeTimePricingAdditionalCharge {
    id?: number;
    name?: string;
    amountType?: AmountType;
    amount?: number;
    printSequence?: number;
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
    teeOffDate?: Date;
    teeOffTimeFrom?: Date;
    teeOffTimeTo?: Date;
    totalPlayers?: number;
    buggyRequired?: number;
    caddiesRequired?: number;
    ninesPlaying?: number;
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
    available?: boolean;
    reasonsForUnavailability?: string[];
    currency?: CurrencyData;
    originalPrices?: { [index: string]: number };
    displayPrices?: { [index: string]: number };
}

export interface TeeTimeSlotDisplayPage extends PagedData<TeeTimeSlotDisplay> {
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
    deleted?: boolean;
    nineHolesAllowed?: boolean;
    eighteenHolesAllowed?: boolean;
    period?: string;
}

export interface TeeTimeSlotType {
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
}

export interface CompetitionRound {
    roundNo?: number;
    courseNames?: string;
    outTotal?: number;
    inTotal?: number;
    outTotalNet?: number;
    inTotalNet?: number;
    nines?: WhichNine[];
}

export interface GameRoundCourse {
    whichNine?: number;
    courseId?: number;
    courseName?: string;
}

export interface HoleScore {
    whichNine?: number;
    holeNo?: number;
    courseHoleNo?: number;
    parScore?: number;
    index?: number;
    grossScore?: number;
    netScore?: number;
    toPar?: number;
    toParNet?: number;
}

export interface PlayerScorecard {
    playerRoundId?: number;
    playerId?: number;
    playerName?: string;
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
    gameRoundId?: number;
    roundNo?: number;
    playedOn?: Date;
    startTime?: Date;
    actualStartTime?: Date;
    startingHole?: number;
    holesPlayed?: number;
    flightNo?: string;
    buggyNo?: string;
    status?: PlayerRoundStatus;
    handicapStatus?: string;
    teeBoxName?: string;
    submittedForHandicap?: boolean;
    outTotalGross?: number;
    inTotalGrosss?: number;
    totalGross?: number;
    outTotalNet?: number;
    inTotalNet?: number;
    totalNet?: number;
    handicapSystemApplied?: string;
    courses?: GameRoundCourse[];
    scores?: HoleScore[];
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

export interface RoleType {
    id?: string;
    name?: string;
}

export interface UserAuthentication {
    id?: number;
    name?: string;
    userName?: string;
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
    defaultRole?: boolean;
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
    surcharges?: StayAndPlaySurcharge[];
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
}

export interface PackageStayOption {
    id?: number;
    hotel?: Hotel;
    roomSpecification?: string;
    standardOption?: boolean;
    availableForAdditionalNight?: boolean;
    maxNights?: number;
    additionalCharge?: number;
    includesTax?: boolean;
    taxPercentage?: number;
    surcharges?: StayAndPlaySurcharge[];
}

export interface PackageStayOptionForm {
    hotelId?: number;
    roomSpecification?: string;
    standardOption?: boolean;
    availableForAdditionalNight?: boolean;
    maxNights?: number;
    additionalCharge?: number;
    includesTax?: boolean;
    taxPercentage?: number;
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
    includesTax?: boolean;
    taxPercentage?: number;
    packageImages?: string[];
    termsAndConditions?: string;
    currency?: CurrencyData;
    packageStayOptions?: PackageStayOption[];
    packagePlayOptions?: PackagePlayOption[];
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
    includesTax?: boolean;
    taxPercentage?: number;
    termsAndConditions?: string;
}

export interface StayAndPlayPackagePage extends PagedData<StayAndPlayPackage> {
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
    acceptedPrice?: number;
    startDate?: Date;
    endDate?: Date;
    preferredDates?: string;
    amountPaid?: number;
    stayOptionsSelected?: StayOptionSelected[];
    playOptionsSelected?: PlayOptionSelected[];
    stayAndPlayPlayers?: StayAndPlayPlayer[];
    communications?: StayAndPlayRequestComm[];
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

export interface StayAndPlayRequestPage extends PagedData<StayAndPlayRequest> {
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
}

export interface StayAndPlaySurchargeForm {
    surchargeName?: string;
    applicableOn?: number[];
    surchargeAmount?: number;
    includesTax?: boolean;
    taxPercentage?: number;
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
}

export interface ClubTransactionExportPage extends PagedData<ClubTransactionExport> {
}

export interface ClubTransactionPage extends PagedData<ClubTransaction> {
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
}

export interface BasicAuthentication {
}

export interface Locale extends Cloneable {
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

export type AuthFailureType = "InvalidCredentials" | "NotAPlayer" | "NotAClubMember" | "NotAClubUser" | "NotMygolfUser";

export type DayIdType = "All" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday" | "Weekday" | "Weekend" | "Holiday";

export type DayNames = "All" | "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Weekday" | "Weekend";

export type DebitOrCredit = "Debit" | "Credit";

export type PaidFor = "Booking" | "CompetitionRegistration" | "HandicapIndex" | "Unknown";

export type PeriodType = "Day" | "Week" | "Month" | "Year";

export type RefundMode = "Cash" | "BankTransfer" | "ClubCredit" | "M2UCredit" | "Unknown";

export type AuditChangeType = "Create" | "Update" | "Delete";

export type MemberChargeType = "Standard" | "Override" | "Optional";

export type MembershipStatus = "Pending" | "Active" | "Inactive" | "Suspended";

export type OnMembershipSuspension = "ChangeChargeType" | "DenyClubEntry" | "DenyFacility";

export type RecurringChargerPeriod = "Daily" | "Monthly" | "Yearly";

export type StatementFrequency = "Weekly" | "Monthly" | "Quarterly" | "Yearly";

export type TransactionStatus = "Generated" | "Posted" | "Reversed";

export type FlightType = "Shotgun" | "ShotgunSplit" | "FirstHole" | "FirstHoleSplitSort" | "FirstHoleSplitNine" | "FirstHoleSplitEven";

export type OcbType = "Handicap" | "HoleRange" | "SpecificHoles" | "RoundTotal" | "PlayerTotal";

export type PlayerAdvanceType = "AllAdvance" | "TopNPlayers" | "CutOffScore";

export type ScorerSwapType = "SwapOneAndTwo" | "SwapOneAndThree" | "SwapOneAndFour";

export type ScorerType = "OwnScoring" | "FirstPlayerScoring" | "SecondPlayerScoring" | "ThirdPlayerScoring" | "FourthPlayerScoring" | "SwapBuggyScoring" | "SwapScoring";

export type PartnerService = "DISCOUNT" | "NGA_MEMBERSHIP" | "INSURANCE" | "OTHER";

export type SyncDirection = "In" | "Out" | "Both";

export type BasePeriod = "Day" | "Month" | "Year";

export type FeatureBundlePriceType = "Flat" | "Slabbed" | "Tiered";

export type SubscriptionType = "Paid" | "Gifted" | "Trial";

export type MaritalStatus = "Married" | "UnMarried" | "Unknown";

export type AmountType = "Absolute" | "Percentage" | "Package";

export type BookingCommissionStatus = "None" | "Calculate" | "Recalculate" | "Success" | "Error" | "Ignored";

export type CancelPolicy = "None" | "ForfeitDeposit" | "ForfeitAmount" | "FixedAmount";

export type PricingComponentType = "Green" | "Caddy" | "Buggy" | "CaddyBooking" | "Insurance" | "Other";

export type TeeTimeBookingStatus = "Booked" | "Secured" | "CancelledByPlayer" | "CancelledByClub" | "PaymentPartial" | "PaymentFull" | "FlightRegistered" | "RefundInitiated" | "RefundCompleted";

export type TeeTimeFlightStatus = "Created" | "Assigned" | "Dispatched" | "PlayStarted" | "CrossedOver" | "Abandoned" | "PlayFinished";

export type BillStatus = "Pending" | "Paid" | "Failed";

export type ClubPaymentInstanceStatus = "Generated" | "Approved" | "Paid";

export type PaymentMappingFor = "PaymentRecorded" | "PaymentReceived" | "GatewayCommission";

export type PaymentSetupFor = "PaymentRecorded" | "PaymentReceived" | "GatewayCommission";

export type RevenueType = "BookingCommission" | "StayAndPlay" | "Competition" | "CardMemberCommission";

export type StayAndPlayRequestStatus = "Draft" | "Generated" | "WaitingCustomerResponse" | "WaitingOwnerResponse" | "Rejected" | "Expired" | "Approved" | "Booked" | "Reversed";

export type TransactionTypeUsedFor = "PricingComponent" | "RoundingAdj" | "Discount" | "CardDiscount" | "Voucher" | "Waiver" | "Refund" | "Penalty" | "Tax" | "OnlinePayment" | "OfflinePayment" | "CashPayment" | "ChargeToAccount" | "Wallet" | "ClubMembership" | "RedeemCredit";

export type GameRoundStatus = "Pending" | "InProgress" | "Completed";

export type PlayerRoundStatus = "Pending" | "InProgress" | "Completed" | "Withdrawn";

export type UserType = "Britesoft" | "Player" | "Organizer" | "Club" | "Admin" | "Caddy" | "Partner" | "Unknown";

export type CompetitionPlayerStatus = "Registered" | "NoShow" | "Withdrawn" | "FailedCutoff";

export type EmailStatus = "Queued" | "Error" | "Sent" | "Rejected";


/**
 * Creates an instance of PlainScorecard
 * @param competition
 * @returns {{success: boolean, clientId: any, competition: boolean, playerRoundScores: any[]<PlayerRoundScores>, courses: any[]<CourseInfo>, finished: boolean}}
 */
export function createScorecard(competition: boolean) {
    return {
        success          : true,
        clientId         : util.generateUUID(),
        competition      : competition,
        playerRoundScores: new Array<PlayerRoundScores>(),
        courses          : new Array<CourseInfo>(),
        finished         : false
    };

}