## Project File Structure: Pencilbox-Quiz

Below is the repository tree for quick reference.

```
Pencilbox-Quiz
├── app
│   ├── Console
│   │   └── Commands
│   │       ├── Analytics
│   │       │   ├── CleanupAnalyticsCommand.php
│   │       │   ├── PersistRealTimeCommand.php
│   │       │   ├── StatsCommand.php
│   │       │   └── TestCommand.php
│   │       ├── CacheManagementCommand.php
│   │       ├── CleanupQuizActivityLogCommand.php
│   │       ├── CleanupScheduledJobsCommand.php
│   │       ├── GenerateModelRelationshipsCommand.php
│   │       ├── ListBlockedDevices.php
│   │       ├── MakeResource.php
│   │       ├── ModuleManagementCommand.php
│   │       ├── ProcessScheduledJobsCommand.php
│   │       ├── QueueManagementCommand.php
│   │       ├── RecalculateQuizLeaderboard.php
│   │       ├── RevokeAppToken.php
│   │       ├── RotateAppSecrets.php
│   │       └── SecurityAuditCommand.php
│   ├── Contracts
│   │   └── SessionServiceInterface.php
│   ├── DTOs
│   │   ├── BaseDTO.php
│   │   ├── RoleDTO.php
│   │   └── UserRegistrationDTO.php
│   ├── Enums
│   │   ├── DifficultyLevels.php
│   │   ├── QuestionTypes.php
│   │   └── QuizStatus.php
│   ├── Events
│   │   └── QuizLiveUpdate.php
│   ├── Helpers
│   │   ├── ClientHelpers.php
│   │   ├── GuestEmailHelper.php
│   │   ├── Helper.php
│   │   ├── QueryBuilderHelper.php
│   │   └── SecurityHeaderHelper.php
│   ├── Http
│   │   ├── Controllers
│   │   │   ├── Admin
│   │   │   │   ├── BlogCategoryController.php
│   │   │   │   ├── BlogController.php
│   │   │   │   ├── CollectionController.php
│   │   │   │   ├── CountryController.php
│   │   │   │   ├── DashboardController.php
│   │   │   │   ├── ImageUpdateController.php
│   │   │   │   ├── ModuleManagementController.php
│   │   │   │   ├── PermissionController.php
│   │   │   │   ├── QuestionController.php
│   │   │   │   ├── QuizCategoryController.php
│   │   │   │   ├── QuizController.php
│   │   │   │   ├── QuizLiveController.php
│   │   │   │   ├── QuizQuestionManagementController.php
│   │   │   │   ├── QuizReportController.php
│   │   │   │   ├── QuizSecondController.php
│   │   │   │   ├── QuizTagController.php
│   │   │   │   ├── RoleController.php
│   │   │   │   ├── SecurityAuditController.php
│   │   │   │   ├── SubjectController.php
│   │   │   │   ├── TagController.php
│   │   │   │   ├── TeamController.php
│   │   │   │   └── UserRoleAssignmentController.php
│   │   │   ├── Analytics
│   │   │   │   ├── ActivityAnalyticsController.php
│   │   │   │   ├── GamificationAnalyticsController.php
│   │   │   │   ├── LeaderboardAnalyticsController.php
│   │   │   │   ├── ParticipantAnalyticsController.php
│   │   │   │   ├── PerformanceAnalyticsController.php
│   │   │   │   └── QuizAnalyticsController.php
│   │   │   ├── Api
│   │   │   │   ├── Analytics
│   │   │   │   │   ├── ActivityAnalyticsController.php
│   │   │   │   │   ├── AnalyticsController.php
│   │   │   │   │   ├── GamificationAnalyticsController.php
│   │   │   │   │   ├── LeaderboardAnalyticsController.php
│   │   │   │   │   ├── ParticipantAnalyticsController.php
│   │   │   │   │   ├── PerformanceAnalyticsController.php
│   │   │   │   │   ├── QuizAnalyticsController.php
│   │   │   │   │   └── RealTimeAnalyticsController.php
│   │   │   │   ├── ApiController.php
│   │   │   │   ├── AuthController.php
│   │   │   │   ├── BundleController.php
│   │   │   │   ├── NotificationController.php
│   │   │   │   ├── OrderController.php
│   │   │   │   ├── PurchaseController.php
│   │   │   │   ├── QuizCategoryController.php
│   │   │   │   ├── QuizController.php
│   │   │   │   ├── QuizParticipationController.php
│   │   │   │   ├── QuizReportController.php
│   │   │   │   ├── QuizTagController.php
│   │   │   │   ├── RevenueController.php
│   │   │   │   ├── SubjectController.php
│   │   │   │   └── SubscriptionController.php
│   │   │   ├── Auth
│   │   │   │   ├── AppTokenController.php
│   │   │   │   ├── AuthenticatedSessionController.php
│   │   │   │   ├── ConfirmablePasswordController.php
│   │   │   │   ├── EmailVerificationNotificationController.php
│   │   │   │   ├── EmailVerificationPromptController.php
│   │   │   │   ├── NewPasswordController.php
│   │   │   │   ├── PasswordResetLinkController.php
│   │   │   │   ├── RegisteredUserController.php
│   │   │   │   ├── SocialAuthController.php
│   │   │   │   └── VerifyEmailController.php
│   │   │   ├── Settings
│   │   │   │   ├── PasswordController.php
│   │   │   │   └── ProfileController.php
│   │   │   ├── Web
│   │   │   │   ├── Analytics
│   │   │   │   │   └── DashboardController.php
│   │   │   │   ├── BundlePurchaseController.php
│   │   │   │   ├── NotificationController.php
│   │   │   │   ├── PaymentWebhookController.php
│   │   │   │   ├── QuizBundleController.php
│   │   │   │   └── WebController.php
│   │   │   ├── AdminController.php
│   │   │   ├── Controller.php
│   │   │   ├── DashboardController.php
│   │   │   ├── ExampleController.php
│   │   │   ├── FrontendController.php
│   │   │   ├── QuestionShareController.php
│   │   │   ├── QuizParticipationController.php
│   │   │   ├── QuizShareController.php
│   │   │   ├── ShortUrlController.php
│   │   │   ├── SslCommerzPaymentController.php
│   │   │   ├── UserController.php
│   │   │   └── UserProfileController.php
│   │   ├── Middleware
│   │   │   ├── AddSecurityHeaders.php
│   │   │   ├── CheckOngoingAttempt.php
│   │   │   ├── CheckOngoingAttemptApi.php
│   │   │   ├── EnsureAttemptEligibility.php
│   │   │   ├── EnsureAttemptEligibilityApi.php
│   │   │   ├── EnsureLiveAttemptEligibility.php
│   │   │   ├── EnsureLiveAttemptEligibilityApi.php
│   │   │   ├── EnsureQuizParticipantAccess.php
│   │   │   ├── EnsureQuizParticipantAccessApi.php
│   │   │   ├── GuestEmailMiddleware.php
│   │   │   ├── HandleAppearance.php
│   │   │   ├── HandleInertiaRequests.php
│   │   │   ├── RealTimeAnalyticsMiddleware.php
│   │   │   ├── RedirectIfAuthenticated.php
│   │   │   ├── VerifyActiveSession.php
│   │   │   ├── VerifyAppJwt.php
│   │   │   └── VerifyAppSignature.php
│   │   ├── Requests
│   │   │   ├── Auth
│   │   │   │   ├── LoginRequest.php
│   │   │   │   └── UserRegistrationRequest.php
│   │   │   ├── Settings
│   │   │   │   └── ProfileUpdateRequest.php
│   │   │   ├── BaseRequest.php
│   │   │   ├── BlogCategoryStoreRequest.php
│   │   │   ├── BlogCategoryUpdateRequest.php
│   │   │   ├── BlogStoreRequest.php
│   │   │   ├── BlogUpdateRequest.php
│   │   │   ├── CountryStoreRequest.php
│   │   │   ├── CountryUpdateRequest.php
│   │   │   ├── ImportQuestionsRequest.php
│   │   │   ├── ImportRandomQuestionsRequest.php
│   │   │   ├── QuizCategoryStoreRequest.php
│   │   │   ├── QuizCategoryUpdateRequest.php
│   │   │   ├── QuizStoreRequest.php
│   │   │   ├── quizTagStoreRequest.php
│   │   │   ├── quizTagUpdateRequest.php
│   │   │   ├── QuizUpdateRequest.php
│   │   │   ├── SubjectStoreRequest.php
│   │   │   ├── SubjectUpdateRequest.php
│   │   │   ├── TagStoreRequest.php
│   │   │   └── TagUpdateRequest.php
│   │   └── Resources
│   │       ├── ApiResponse.php
│   │       ├── QuestionResource.php
│   │       ├── QuizActivityResource.php
│   │       ├── QuizAnalyticsDataResource.php
│   │       ├── QuizCategoryResource.php
│   │       ├── QuizCodeResource.php
│   │       ├── QuizCodeSettingResource.php
│   │       ├── QuizLeaderboardResource.php
│   │       ├── QuizLeaderboardStatsResource.php
│   │       ├── QuizOverviewResource.php
│   │       ├── QuizParticipantResource.php
│   │       ├── QuizQuestionResponseResource.php
│   │       ├── QuizResource.php
│   │       ├── QuizResponseResource.php
│   │       ├── QuizStatisticsResource.php
│   │       ├── QuizStatsResource.php
│   │       ├── QuizTagResource.php
│   │       ├── QuizUserResponseDetailResource.php
│   │       ├── QuizUserResponseResource.php
│   │       ├── ShortCodeResource.php
│   │       ├── SubjectResource.php
│   │       └── UserResource.php
│   ├── Jobs
│   │   ├── AwardBadgesJob.php
│   │   ├── ProcessQuizCompletionJob.php
│   │   ├── UpdateQuizAnalyticsJob.php
│   │   ├── UpdateQuizLeaderboardJob.php
│   │   └── UpdateQuizStatisticsJob.php
│   ├── Mail
│   │   ├── EmailVerificationOtpMail.php
│   │   ├── PasswordResetMail.php
│   │   └── ResendOtpMail.php
│   ├── Models
│   │   ├── AppDevice.php
│   │   ├── Badge.php
│   │   ├── BundleItem.php
│   │   ├── Collection.php
│   │   ├── CollectionItem.php
│   │   ├── CollectionShare.php
│   │   ├── FillBlankAnswer.php
│   │   ├── LeaderboardCategory.php
│   │   ├── LeaderboardCategoryEntry.php
│   │   ├── MatchingPair.php
│   │   ├── ModuleSettings.php
│   │   ├── OptimizedQuiz.php
│   │   ├── Order.php
│   │   ├── OrderItem.php
│   │   ├── Point.php
│   │   ├── Question.php
│   │   ├── QuestionCategory.php
│   │   ├── QuestionOption.php
│   │   ├── QuestionShare.php
│   │   ├── Quiz.php
│   │   ├── QuizActivityLog.php
│   │   ├── QuizAnalytics.php
│   │   ├── QuizBookmark.php
│   │   ├── QuizBundle.php
│   │   ├── QuizCategory.php
│   │   ├── QuizCode.php
│   │   ├── QuizCodeSetting.php
│   │   ├── QuizFavorite.php
│   │   ├── QuizLeaderboard.php
│   │   ├── QuizNotification.php
│   │   ├── QuizParticipant.php
│   │   ├── QuizProperties.php
│   │   ├── QuizPurchase.php
│   │   ├── QuizResponse.php
│   │   ├── QuizReview.php
│   │   ├── QuizReviewReply.php
│   │   ├── QuizSeo.php
│   │   ├── QuizShare.php
│   │   ├── QuizStatistics.php
│   │   ├── QuizTag.php
│   │   ├── QuizTimingSettings.php
│   │   ├── QuizUser.php
│   │   ├── RealTimeAnalytics.php
│   │   ├── RequestAnalytics.php
│   │   ├── RevenueTracking.php
│   │   ├── ScheduledJob.php
│   │   ├── SecurityAuditLog.php
│   │   ├── ShortUrl.php
│   │   ├── Streak.php
│   │   ├── Subject.php
│   │   ├── SubscriptionCoupon.php
│   │   ├── SubscriptionCouponUsage.php
│   │   ├── SubscriptionPayment.php
│   │   ├── SubscriptionPlan.php
│   │   ├── SubscriptionPlanType.php
│   │   ├── SubscriptionType.php
│   │   ├── SubscriptionUsage.php
│   │   ├── Team.php
│   │   ├── User.php
│   │   ├── UserBadge.php
│   │   ├── UserLocation.php
│   │   ├── UserLoginHistory.php
│   │   ├── UserPreference.php
│   │   ├── UserProfile.php
│   │   └── UserSubscription.php
│   ├── Notifications
│   │   └── BadgeEarnedNotification.php
│   ├── Observers
│   │   ├── QuizCacheObserver.php
│   │   ├── QuizLeaderboardCacheObserver.php
│   │   ├── QuizParticipantCacheObserver.php
│   │   ├── QuizParticipantObserver.php
│   │   ├── QuizResponseCacheObserver.php
│   │   └── SubjectObserver.php
│   ├── Providers
│   │   ├── AnalyticsCommandServiceProvider.php
│   │   ├── AppServiceProvider.php
│   │   ├── AuthServiceProvider.php
│   │   └── RepositoryServiceProvider.php
│   ├── Repositories
│   │   ├── Interfaces
│   │   │   ├── AuthRepositoryInterface.php
│   │   │   ├── BaseRepositoryInterface.php
│   │   │   ├── BlogCategoryRepositoryInterface.php
│   │   │   ├── BlogRepositoryInterface.php
│   │   │   ├── CollectionRepositoryInterface.php
│   │   │   ├── CountryRepositoryInterface.php
│   │   │   ├── NotificationRepositoryInterface.php
│   │   │   ├── QuestionRepositoryInterface.php
│   │   │   ├── QuizAnalyticsRepositoryInterface.php
│   │   │   ├── QuizCategoryRepositoryInterface.php
│   │   │   ├── QuizParticipationRepositoryInterface.php
│   │   │   ├── QuizRepositoryInterface.php
│   │   │   ├── QuizSecondRepositoryInterface.php
│   │   │   ├── QuizTagRepositoryInterface.php
│   │   │   ├── RepositoryInterface.php
│   │   │   ├── SubjectRepositoryInterface.php
│   │   │   └── TagRepositoryInterface.php
│   │   ├── AuthRepository.php
│   │   ├── BaseRepository.php
│   │   ├── BlogCategoryRepository.php
│   │   ├── BlogRepository.php
│   │   ├── CollectionRepository.php
│   │   ├── CountryRepository.php
│   │   ├── ImageUpdateRepository.php
│   │   ├── NotificationRepository.php
│   │   ├── QuestionRepository.php
│   │   ├── QuizAnalyticsRepository.php
│   │   ├── QuizCategoryRepository.php
│   │   ├── QuizParticipationRepository.php
│   │   ├── QuizRepository.php
│   │   ├── QuizSecondRepository.php
│   │   ├── QuizTagRepository.php
│   │   ├── SubjectRepository.php
│   │   └── TagRepository.php
│   ├── Services
│   │   ├── AI
│   │   │   ├── ChatGPTQuestionGenerationService.php
│   │   │   ├── DeepseekQuestionGenerationService.php
│   │   │   ├── GeminiQuestionGenerationService.php
│   │   │   ├── QuestionGenerationService.php
│   │   │   └── QuestionGenerationServiceInterface.php
│   │   ├── Analytics
│   │   │   ├── BaseAnalyticsService.php
│   │   │   ├── ParticipantAnalyticsService.php
│   │   │   └── QuizAnalyticsService.php
│   │   ├── RequestAnalytics
│   │   │   ├── Geoip
│   │   │   ├── AnalyticsService.php
│   │   │   └── UserAgentService.php
│   │   ├── BadgeService.php
│   │   ├── BundleService.php
│   │   ├── CacheService.php
│   │   ├── DatabaseModuleManager.php
│   │   ├── DeviceTrackingService.php
│   │   ├── EvaluateAnswerService.php
│   │   ├── JobDispatcherService.php
│   │   ├── OrderService.php
│   │   ├── PurchaseService.php
│   │   ├── QuizAttemptService.php
│   │   ├── QuizGamificationService.php
│   │   ├── QuizLiveService.php
│   │   ├── QuizSessionService.php
│   │   ├── RealTimeAnalyticsService.php
│   │   ├── ResponseService.php
│   │   ├── RevenueAnalyticsService.php
│   │   ├── ScheduledJobService.php
│   │   ├── SessionService.php
│   │   ├── SessionTrackingService.php
│   │   ├── ShortUrlService.php
│   │   ├── StreakService.php
│   │   └── SubscriptionService.php
│   ├── Traits
│   │   ├── Deletable.php
│   │   ├── HasGuestEmail.php
│   │   ├── HasImageUrl.php
│   │   ├── ImageHandlerTrait.php
│   │   ├── ResponseTrait.php
│   │   ├── SlugGenerator.php
│   │   └── UserStampsTrait.php
│   └── helpers.php
├── bootstrap
│   ├── cache
│   ├── app.php
│   └── providers.php
├── components
│   └── ui
│       ├── icon-picker.jsx
│       └── icons-data.js
├── config
│   ├── app.php
│   ├── appsecurity.php
│   ├── auth.php
│   ├── broadcasting.php
│   ├── cache.php
│   ├── concurrency.php
│   ├── cors.php
│   ├── database.php
│   ├── filesystems.php
│   ├── image.php
│   ├── inertia.php
│   ├── logging.php
│   ├── mail.php
│   ├── modules.php
│   ├── permission.php
│   ├── queue.php
│   ├── realtime-analytics.php
│   ├── request-analytics.php
│   ├── sanctum.php
│   ├── scramble.php
│   ├── services.php
│   ├── session.php
│   ├── social-login.php
│   ├── sslcommerz.php
│   └── supercache.php
├── database
│   ├── factories
│   │   └── UserFactory.php
│   ├── migrations
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 2024_01_01_000001_create_users_table.php
│   │   ├── 2024_01_01_000002_create_user_profiles_table.php
│   │   ├── 2024_01_01_000003_create_subjects_table.php
│   │   ├── 2024_01_01_000004_create_quiz_categories_table.php
│   │   ├── 2024_01_01_000005_create_quiz_tags_table.php
│   │   ├── 2024_01_01_000006_create_quizzes_table.php
│   │   ├── 2024_01_01_000007_create_quiz_codes_table.php
│   │   ├── 2024_01_01_000007_create_quiz_timing_settings_table.php
│   │   ├── 2024_01_01_000008_create_quiz_properties_table.php
│   │   ├── 2024_01_01_000009_create_quiz_seos_table.php
│   │   ├── 2024_01_01_000010_create_quiz_tag_pivot_table.php
│   │   ├── 2024_01_01_000011_create_questions_table.php
│   │   ├── 2024_01_01_000012_create_quiz_questions_table.php
│   │   ├── 2024_01_01_000013_create_question_options_table.php
│   │   ├── 2024_01_01_000014_create_fill_blank_answers_table.php
│   │   ├── 2024_01_01_000015_create_matching_pairs_table.php
│   │   ├── 2024_01_01_000016_create_quiz_participants_table.php
│   │   ├── 2024_01_01_000017_create_quiz_responses_table.php
│   │   ├── 2024_01_01_000018_create_quiz_statistics_table.php
│   │   ├── 2024_01_01_000019_create_quiz_analytics_table.php
│   │   ├── 2024_01_01_000020_create_quiz_leaderboards_table.php
│   │   ├── 2024_01_01_000021_create_leaderboard_categories_table.php
│   │   ├── 2024_01_01_000022_create_leaderboard_category_entries_table.php
│   │   ├── 2024_01_01_000023_create_badges_table.php
│   │   ├── 2024_01_01_000024_create_user_badges_table.php
│   │   ├── 2024_01_01_000025_create_points_table.php
│   │   ├── 2024_01_01_000026_create_streaks_table.php
│   │   ├── 2024_01_01_000027_create_quiz_bookmarks_table.php
│   │   ├── 2024_01_01_000028_create_quiz_favorites_table.php
│   │   ├── 2024_01_01_000029_create_quiz_reviews_table.php
│   │   ├── 2024_01_01_000030_create_quiz_reviews_replies_table.php
│   │   ├── 2024_01_01_000031_create_quiz_notifications_table.php
│   │   ├── 2024_01_01_000032_create_quiz_activity_logs_table.php
│   │   ├── 2024_01_01_000033_create_subscription_plans_table.php
│   │   ├── 2024_01_01_000034_create_subscription_types_table.php
│   │   ├── 2024_01_01_000035_create_subscription_plan_types_table.php
│   │   ├── 2024_01_01_000036_create_user_subscriptions_table.php
│   │   ├── 2024_01_01_000037_create_subscription_usage_table.php
│   │   ├── 2024_01_01_000038_create_subscription_payments_table.php
│   │   ├── 2024_01_01_000039_create_subscription_coupons_table.php
│   │   ├── 2024_01_01_000040_create_subscription_coupon_usage_table.php
│   │   ├── 2024_04_09_062424_create_countries_table.php
│   │   ├── 2024_04_11_042216_create_user_verifications_table.php
│   │   ├── 2024_04_11_042508_create_user_locations_table.php
│   │   ├── 2024_04_11_042509_create_user_login_histories_table.php
│   │   ├── 2024_04_11_042510_create_user_securities_table.php
│   │   ├── 2024_04_11_044336_create_notification_settings_table.php
│   │   ├── 2024_04_21_051349_create_permission_tables.php
│   │   ├── 2025_07_17_050658_add_publish_settings_to_quizzes_table.php
│   │   ├── 2025_07_19_080902_create_question_subject_table.php
│   │   ├── 2025_07_19_080905_create_question_quiz_category_table.php
│   │   ├── 2025_07_22_065920_create_notifications_table.php
│   │   ├── 2025_08_18_060146_create_question_categories_table.php
│   │   ├── 2025_08_19_081513_create_personal_access_tokens_table.php
│   │   ├── 2025_09_14_122052_create_quiz_users_table.php
│   │   ├── 2025_09_18_160203_create_quiz_code_settings_table.php
│   │   ├── 2025_09_21_171242_create_scheduled_jobs_table.php
│   │   ├── 2025_09_23_000001_create_short_urls_table.php
│   │   ├── 2025_09_23_000100_create_teams_and_quiz_shares_tables.php
│   │   ├── 2025_09_23_000200_create_question_shares_table.php
│   │   ├── 2025_09_24_000100_create_collections_table.php
│   │   ├── 2025_09_24_000110_create_collection_items_table.php
│   │   ├── 2025_09_24_000120_add_is_public_to_collections_table.php
│   │   ├── 2025_09_24_000130_create_collection_shares_table.php
│   │   ├── 2025_09_27_114455_add_image_to_quizzes.php
│   │   ├── 2025_09_29_152715_create_request_analytics_table.php
│   │   ├── 2025_09_29_152716_add_indexes_to_request_analytics_table.php
│   │   ├── 2025_10_09_122709_add_new_column_to_quiz_system.php
│   │   ├── 2025_10_12_113457_create_quiz_bundles_table.php
│   │   ├── 2025_10_12_113458_create_quiz_purchases_table.php
│   │   ├── 2025_10_12_113500_create_bundle_items_table.php
│   │   ├── 2025_10_12_113502_add_pricing_to_quizzes_table.php
│   │   ├── 2025_10_12_114008_create_orders_table.php
│   │   ├── 2025_10_12_114011_create_order_items_table.php
│   │   ├── 2025_10_12_114019_create_revenue_tracking_table.php
│   │   ├── 2025_10_18_131257_create_app_devices_table.php
│   │   ├── 2025_10_18_131302_create_security_audit_logs_table.php
│   │   ├── 2025_10_19_144417_create_real_time_analytics_table.php
│   │   ├── 2025_10_19_182633_add_additional_indexes_to_request_analytics_table.php
│   │   ├── 2025_10_23_124857_add_indexes_to_request_analytics_table.php
│   │   ├── 2025_10_23_151204_create_module_settings_table.php
│   │   ├── 2025_10_23_151205_create_quizzes_new_data_table.php
│   │   ├── 2025_10_23_151206_create_quizzess_new_data_table.php
│   │   ├── 2025_10_23_151208_create_quizzes_settings_new_data_table.php
│   │   └── 2025_10_27_120327_add_new_data_to_quizzes_table.php
│   ├── seeders
│   │   ├── AssignPermissionsAndRolesSeeder.php
│   │   ├── BadgeTableSeeder.php
│   │   ├── CategorySeeder.php
│   │   ├── CountrySeeder.php
│   │   ├── DatabaseSeeder.php
│   │   ├── EditorSeeder.php
│   │   ├── fill_blank.json
│   │   ├── LanguageSeeder.php
│   │   ├── matching.json
│   │   ├── mcq_multiple.json
│   │   ├── mcq_single.json
│   │   ├── ModuleSettingsSeeder.php
│   │   ├── OperatingSystemSeeder.php
│   │   ├── PermissionSeeder.php
│   │   ├── PostSeeder.php
│   │   ├── PostTagSeeder.php
│   │   ├── QuestionOptionsSeeder.php
│   │   ├── QuestionSeeder.php
│   │   ├── QuestionsSeeder.php
│   │   ├── QuestionSubjectRelationshipSeeder.php
│   │   ├── question_data.json
│   │   ├── QuizBundleSeeder.php
│   │   ├── QuizCategorySeeder.php
│   │   ├── QuizQuestionsSeeder.php
│   │   ├── QuizSeeder.php
│   │   ├── QuizTagPivotSeeder.php
│   │   ├── QuizTagSeeder.php
│   │   ├── QuizzesSeeder.php
│   │   ├── RolesAndPermissionsSeeder.php
│   │   ├── RoleSeeder.php
│   │   ├── SubjectSeeder.php
│   │   ├── TagSeeder.php
│   │   ├── true_false.json
│   │   └── UserSeeder.php
│   ├── .gitignore
│   └── database.sqlite
├── lang
├── projectDocumentation
│   ├── components
│   │   ├── ActionsDropdown.md
│   │   ├── DataTable.md
│   │   ├── ImageUpload.md
│   │   └── ListingPage.md
│   └── utils
│       └── tableUtils.md
├── public
│   ├── .well-known
│   ├── assets
│   ├── web
│   ├── favicon.ico
│   ├── hot
│   ├── index.php
│   ├── logo.svg
│   └── robots.txt
├── quiz-api
│   ├── analytics-apis.postman_collection.json
│   ├── app-security-apis.postman_collection.json
│   ├── auth-apis.postman_collection.json
│   ├── general-quiz-apis.postman_collection.json
│   ├── pencilbox-quiz-api-collection.postman_collection.json
│   ├── quiz-category-management-apis.postman_collection.json
│   ├── quiz-management-apis.postman_collection.json
│   ├── quiz-participation-apis.postman_collection.json
│   ├── quiz-reports-apis.postman_collection.json
│   ├── quiz-second-controller-apis.postman_collection.json
│   ├── README.md
│   └── subject-management-apis.postman_collection.json
├── resources
│   ├── css
│   │   ├── app-19-9.css
│   │   ├── app.css
│   │   ├── app_old.css
│   │   ├── copy app.css
│   │   ├── loader.css
│   │   ├── old-last-custom.css
│   │   ├── quiz-report.css
│   │   └── quiz-style.css
│   ├── js
│   │   ├── actions
│   │   │   ├── App
│   │   │   │   ├── Http
│   │   │   │   │   ├── Controllers
│   │   │   │   │   │   ├── Admin
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── PermissionController.ts
│   │   │   │   │   │   │   └── RoleController.ts
│   │   │   │   │   │   ├── Auth
│   │   │   │   │   │   │   ├── AuthenticatedSessionController.ts
│   │   │   │   │   │   │   ├── ConfirmablePasswordController.ts
│   │   │   │   │   │   │   ├── EmailVerificationNotificationController.ts
│   │   │   │   │   │   │   ├── EmailVerificationPromptController.ts
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── NewPasswordController.ts
│   │   │   │   │   │   │   ├── PasswordResetLinkController.ts
│   │   │   │   │   │   │   ├── RegisteredUserController.ts
│   │   │   │   │   │   │   ├── SocialAuthController.ts
│   │   │   │   │   │   │   └── VerifyEmailController.ts
│   │   │   │   │   │   ├── Settings
│   │   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   │   ├── PasswordController.ts
│   │   │   │   │   │   │   └── ProfileController.ts
│   │   │   │   │   │   ├── AdminController.ts
│   │   │   │   │   │   ├── EmployeerController.ts
│   │   │   │   │   │   ├── FreelancerController.ts
│   │   │   │   │   │   ├── FrontendController.ts
│   │   │   │   │   │   ├── index.ts
│   │   │   │   │   │   ├── JobController.ts
│   │   │   │   │   │   ├── MicroTaskCategoryController.ts
│   │   │   │   │   │   ├── PostController.ts
│   │   │   │   │   │   └── UserController.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   └── Illuminate
│   │   │       ├── Routing
│   │   │       │   ├── index.ts
│   │   │       │   └── RedirectController.ts
│   │   │       └── index.ts
│   │   ├── components
│   │   │   ├── admin
│   │   │   │   └── ModuleManagement.jsx
│   │   │   ├── analytics
│   │   │   │   ├── responsive
│   │   │   │   │   ├── DesktopTabs.jsx
│   │   │   │   │   └── MobileTabs.jsx
│   │   │   │   ├── ActivityTab.jsx
│   │   │   │   ├── AnalyticsDashboard.jsx
│   │   │   │   ├── ExportNotification.jsx
│   │   │   │   ├── FloatingActionButton.jsx
│   │   │   │   ├── index.js
│   │   │   │   ├── OverviewTab.jsx
│   │   │   │   ├── ParticipantsTab.jsx
│   │   │   │   ├── PerformanceTab.jsx
│   │   │   │   ├── ProgressCircle.jsx
│   │   │   │   ├── QuestionAnswersModal.jsx
│   │   │   │   ├── QuestionResponsesTab.jsx
│   │   │   │   ├── QuestionUserAnswersTab.jsx
│   │   │   │   ├── QuickStatsOverview.jsx
│   │   │   │   ├── README.md
│   │   │   │   ├── RenderAnswer.jsx
│   │   │   │   ├── StatisticsTab.jsx
│   │   │   │   ├── TrendsTab.jsx
│   │   │   │   ├── UserResponseModal.jsx
│   │   │   │   ├── UserResponsesTab.jsx
│   │   │   │   ├── UserResponsesTab_old_16-9.jsx
│   │   │   │   ├── UserResponsesTab_old_copy.jsx
│   │   │   │   └── utils.js
│   │   │   ├── Card-component
│   │   │   │   ├── ActionCard.jsx
│   │   │   │   ├── AdminControlsCard.jsx
│   │   │   │   ├── AnimatedAvatar.jsx
│   │   │   │   ├── BadgeCard.jsx
│   │   │   │   ├── BaseCard.jsx
│   │   │   │   ├── ConnectionStatusCard.jsx
│   │   │   │   ├── ConnectionStatusIndicator.jsx
│   │   │   │   ├── EmptyStateCard.jsx
│   │   │   │   ├── HeaderCard.jsx
│   │   │   │   ├── LiveHeaderCard.jsx
│   │   │   │   ├── LiveStatsCard.jsx
│   │   │   │   ├── LoungeStatsCard.jsx
│   │   │   │   ├── MiniStatCard.jsx
│   │   │   │   ├── ParticipantCard.jsx
│   │   │   │   ├── ParticipantLoungeCard.jsx
│   │   │   │   ├── ProgressCard.jsx
│   │   │   │   ├── ProgressResponseModal.jsx
│   │   │   │   ├── QRCodeCard.jsx
│   │   │   │   ├── QuickActionsCard.jsx
│   │   │   │   ├── QuizCard.jsx
│   │   │   │   ├── QuizInfoCard.jsx
│   │   │   │   ├── RecentActivityCard.jsx
│   │   │   │   ├── SelectionCard.jsx
│   │   │   │   ├── StatCard.jsx
│   │   │   │   └── WaitingMessageCard.jsx
│   │   │   ├── cart
│   │   │   │   └── CartDropdown.jsx
│   │   │   ├── custom-ui
│   │   │   │   ├── BackButton.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── SearchableCombobox.jsx
│   │   │   │   └── SweetAlert.jsx
│   │   │   ├── DataTables
│   │   │   │   ├── DataTableExtraButtons.jsx
│   │   │   │   ├── DeleteSelectedButton.jsx
│   │   │   │   ├── ExportButton.jsx
│   │   │   │   ├── ExportSelectedButton.jsx
│   │   │   │   └── ImportButton.jsx
│   │   │   ├── frontend
│   │   │   │   ├── components
│   │   │   │   │   ├── BoxBoxShowcase.jsx
│   │   │   │   │   ├── FAQ.jsx
│   │   │   │   │   ├── Footer.jsx
│   │   │   │   │   ├── Header.jsx
│   │   │   │   │   ├── Hero.jsx
│   │   │   │   │   ├── Marketing.jsx
│   │   │   │   │   ├── Partners.jsx
│   │   │   │   │   ├── Process.jsx
│   │   │   │   │   ├── Services.jsx
│   │   │   │   │   ├── Stats.jsx
│   │   │   │   │   ├── Testimonials.jsx
│   │   │   │   │   └── WhyChoose.jsx
│   │   │   │   ├── home
│   │   │   │   │   ├── BrowseCategories.jsx
│   │   │   │   │   ├── hero.jsx
│   │   │   │   │   ├── HowItWorks.jsx
│   │   │   │   │   └── ProComponent.jsx
│   │   │   │   ├── FileUploadComponent.jsx
│   │   │   │   ├── footer.jsx
│   │   │   │   ├── GlobalLoader.jsx
│   │   │   │   └── nav-bar.jsx
│   │   │   ├── leaderboard
│   │   │   │   └── LiveLeaderboard.jsx
│   │   │   ├── modals
│   │   │   │   ├── AddTeamMemberModal.jsx
│   │   │   │   ├── ChangePasswordModal.jsx
│   │   │   │   ├── CreateTeamModal.jsx
│   │   │   │   ├── DeleteAccountModal.jsx
│   │   │   │   ├── IndividualShareModal.jsx
│   │   │   │   ├── ShareQuizModal.jsx
│   │   │   │   └── VerifyEmailModal.jsx
│   │   │   ├── notification
│   │   │   │   └── NotificationComponent.jsx
│   │   │   ├── permissions
│   │   │   │   └── Can.jsx
│   │   │   ├── question
│   │   │   │   ├── ActiveFilters.jsx
│   │   │   │   ├── FilterBar.jsx
│   │   │   │   ├── FilterInput.jsx
│   │   │   │   ├── FilterSelect.jsx
│   │   │   │   ├── QuestionContent.jsx
│   │   │   │   └── QuestionsFilter.jsx
│   │   │   ├── quiz
│   │   │   │   ├── publish
│   │   │   │   │   ├── ActionButtons.jsx
│   │   │   │   │   ├── CheckboxSetting.jsx
│   │   │   │   │   ├── ErrorDisplay.jsx
│   │   │   │   │   ├── FooterNavigation.jsx
│   │   │   │   │   ├── PublishSummary.jsx
│   │   │   │   │   ├── SectionHeader.jsx
│   │   │   │   │   ├── SettingsCard.jsx
│   │   │   │   │   ├── SettingsGroup.jsx
│   │   │   │   │   └── SummaryItem.jsx
│   │   │   │   ├── AdvancedSettings.jsx
│   │   │   │   ├── AIQuestionGenerationModal.jsx
│   │   │   │   ├── BasicSettings.jsx
│   │   │   │   ├── BoxBoxForm.jsx
│   │   │   │   ├── Demo.jsx
│   │   │   │   ├── EssayQuestion.jsx
│   │   │   │   ├── ExplanationAndHint.jsx
│   │   │   │   ├── FillBlankQuestions.jsx
│   │   │   │   ├── FillInTheBlanks.jsx
│   │   │   │   ├── ImportQuestionsModal.jsx
│   │   │   │   ├── index.js
│   │   │   │   ├── MatchingPairs.jsx
│   │   │   │   ├── MatchingQuestion.jsx
│   │   │   │   ├── MCQOptions.jsx
│   │   │   │   ├── MCQQuestion.jsx
│   │   │   │   ├── QuestionBase.jsx
│   │   │   │   ├── QuestionForm.jsx
│   │   │   │   ├── QuestionList.jsx
│   │   │   │   ├── QuestionProgressBar.jsx
│   │   │   │   ├── QuestionStatus.jsx
│   │   │   │   ├── QuestionText.jsx
│   │   │   │   ├── QuestionTimer.jsx
│   │   │   │   ├── QuestionTypeSelector.jsx
│   │   │   │   ├── QuizFilters.jsx
│   │   │   │   ├── QuizQuestion.jsx
│   │   │   │   ├── RandomQuestionGenerateImportModal.jsx
│   │   │   │   ├── ShortAnswerQuestion.jsx
│   │   │   │   ├── TextInputQuestion.jsx
│   │   │   │   ├── TrueFalseOptions.jsx
│   │   │   │   └── TrueFalseQuestion.jsx
│   │   │   ├── quiz-comp
│   │   │   │   ├── AdvancedPagination.jsx
│   │   │   │   ├── QuizFilters.jsx
│   │   │   │   ├── QuizReportTab.jsx
│   │   │   │   ├── QuizShare.jsx
│   │   │   │   └── ShareQuizButton.jsx
│   │   │   ├── quiz-live
│   │   │   │   └── DetailedProgress.jsx
│   │   │   ├── quiz-reports
│   │   │   │   ├── QuizReportsFilters.jsx
│   │   │   │   ├── QuizReportsGrid.jsx
│   │   │   │   ├── QuizReportsHeader.jsx
│   │   │   │   ├── QuizReportsInfoBar.jsx
│   │   │   │   ├── QuizReportsPagination.jsx
│   │   │   │   ├── QuizReportsSummary.jsx
│   │   │   │   └── QuizReportsTable.jsx
│   │   │   ├── ui
│   │   │   │   ├── alert-dialog.jsx
│   │   │   │   ├── alert.jsx
│   │   │   │   ├── avatar.jsx
│   │   │   │   ├── badge.jsx
│   │   │   │   ├── BoxBox.jsx
│   │   │   │   ├── BoxBox.md
│   │   │   │   ├── BoxBoxButton.jsx
│   │   │   │   ├── BoxBoxCard.jsx
│   │   │   │   ├── BoxBoxExample.jsx
│   │   │   │   ├── BoxBoxHeader.jsx
│   │   │   │   ├── BoxBoxRefactorExample.jsx
│   │   │   │   ├── BoxBoxSection.jsx
│   │   │   │   ├── breadcrumb.jsx
│   │   │   │   ├── button.jsx
│   │   │   │   ├── calendar.jsx
│   │   │   │   ├── card.jsx
│   │   │   │   ├── checkbox.jsx
│   │   │   │   ├── collapsible.jsx
│   │   │   │   ├── command.jsx
│   │   │   │   ├── dialog.jsx
│   │   │   │   ├── dropdown-menu.jsx
│   │   │   │   ├── icon.jsx
│   │   │   │   ├── IMPLEMENTATION_GUIDE.md
│   │   │   │   ├── index.js
│   │   │   │   ├── input.jsx
│   │   │   │   ├── label.jsx
│   │   │   │   ├── navigation-menu.jsx
│   │   │   │   ├── pagination.jsx
│   │   │   │   ├── placeholder-pattern.jsx
│   │   │   │   ├── popover.jsx
│   │   │   │   ├── progress.jsx
│   │   │   │   ├── radio-group.jsx
│   │   │   │   ├── scroll-area.jsx
│   │   │   │   ├── select.jsx
│   │   │   │   ├── separator.jsx
│   │   │   │   ├── sheet.jsx
│   │   │   │   ├── sidebar.jsx
│   │   │   │   ├── skeleton.jsx
│   │   │   │   ├── sonner.jsx
│   │   │   │   ├── switch.jsx
│   │   │   │   ├── table.jsx
│   │   │   │   ├── tabs.jsx
│   │   │   │   ├── textarea.jsx
│   │   │   │   ├── toggle-group.jsx
│   │   │   │   ├── toggle-switch.jsx
│   │   │   │   ├── toggle.jsx
│   │   │   │   └── tooltip.jsx
│   │   │   ├── user
│   │   │   │   ├── ActivityBar.jsx
│   │   │   │   └── ProfileDropdown.jsx
│   │   │   ├── ActionsDropdown.jsx
│   │   │   ├── app-content.jsx
│   │   │   ├── app-header.jsx
│   │   │   ├── app-logo-icon.jsx
│   │   │   ├── app-logo.jsx
│   │   │   ├── app-shell.jsx
│   │   │   ├── app-sidebar-header.jsx
│   │   │   ├── app-sidebar.jsx
│   │   │   ├── appearance-dropdown.jsx
│   │   │   ├── appearance-tabs.jsx
│   │   │   ├── breadcrumbs.jsx
│   │   │   ├── DarkModeToggle.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── delete-user.jsx
│   │   │   ├── ExportDropdown.jsx
│   │   │   ├── GlobalForm.jsx
│   │   │   ├── GlobalSelect.jsx
│   │   │   ├── GlobalSelection.jsx
│   │   │   ├── heading-small.jsx
│   │   │   ├── heading.jsx
│   │   │   ├── icon.jsx
│   │   │   ├── ImageUpdateComponent.jsx
│   │   │   ├── ImageUpload.jsx
│   │   │   ├── input-error.jsx
│   │   │   ├── ListingPage.jsx
│   │   │   ├── LiveAnalytics.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── nav-footer.jsx
│   │   │   ├── nav-main.jsx
│   │   │   ├── nav-user.jsx
│   │   │   ├── notifications.jsx
│   │   │   ├── PaginationComponent.jsx
│   │   │   ├── QuillEditor.jsx
│   │   │   ├── RealTimeAnalyticsData.jsx
│   │   │   ├── SelectTagComponent.jsx
│   │   │   ├── ServerAnalyticsNavigation.jsx
│   │   │   ├── SocialLogin.jsx
│   │   │   ├── SubjectSelect.jsx
│   │   │   ├── text-link.jsx
│   │   │   ├── ToastManager.jsx
│   │   │   ├── user-info.jsx
│   │   │   ├── user-menu-content.jsx
│   │   │   └── WebLoader.jsx
│   │   ├── contexts
│   │   │   └── ThemeContext.js
│   │   ├── examples
│   │   ├── hooks
│   │   │   ├── use-appearance.jsx
│   │   │   ├── use-initials.jsx
│   │   │   ├── use-mobile-navigation.js
│   │   │   ├── use-mobile.jsx
│   │   │   └── useFilters.jsx
│   │   ├── layouts
│   │   │   ├── app
│   │   │   │   ├── app-header-layout.jsx
│   │   │   │   ├── app-sidebar-layout.jsx
│   │   │   │   └── app-sidebar-layout.jsx~
│   │   │   ├── auth
│   │   │   │   ├── auth-card-layout.jsx
│   │   │   │   ├── auth-simple-layout.jsx
│   │   │   │   └── auth-split-layout.jsx
│   │   │   ├── quiz
│   │   │   │   └── layout.jsx
│   │   │   ├── settings
│   │   │   │   └── layout.jsx
│   │   │   ├── app-layout.jsx
│   │   │   ├── auth-layout.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   └── UserDashboardLayout.jsx
│   │   ├── lib
│   │   │   ├── mainNavItems.jsx
│   │   │   ├── tableUtils.js
│   │   │   └── utils.js
│   │   ├── pages
│   │   │   ├── admin
│   │   │   │   ├── backups
│   │   │   │   ├── collections
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   ├── ShareDetailsModal.jsx
│   │   │   │   │   ├── ShareModal.jsx
│   │   │   │   │   └── show.jsx
│   │   │   │   ├── dashboard
│   │   │   │   ├── permissions
│   │   │   │   │   ├── create.jsx
│   │   │   │   │   ├── edit.jsx
│   │   │   │   │   └── index.jsx
│   │   │   │   ├── questions
│   │   │   │   │   ├── by-category.jsx
│   │   │   │   │   ├── by-subject.jsx
│   │   │   │   │   ├── create.jsx
│   │   │   │   │   ├── edit.jsx
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   ├── shares.jsx
│   │   │   │   │   └── show.jsx
│   │   │   │   ├── quiz
│   │   │   │   │   ├── report
│   │   │   │   │   │   ├── Details.jsx
│   │   │   │   │   │   ├── Index.jsx
│   │   │   │   │   │   └── QuizDetail.jsx
│   │   │   │   │   └── shares.jsx
│   │   │   │   ├── quiz-second
│   │   │   │   │   ├── demo
│   │   │   │   │   │   ├── demo.jsx
│   │   │   │   │   │   ├── DemoQuiz.jsx
│   │   │   │   │   │   ├── DemoResults.jsx
│   │   │   │   │   │   ├── DemoResultsPage.jsx
│   │   │   │   │   │   ├── MatchingQuestion.jsx
│   │   │   │   │   │   ├── MCQMultipleQuestion.jsx
│   │   │   │   │   │   ├── MCQSingleQuestion.jsx
│   │   │   │   │   │   ├── QuestionTimer.jsx
│   │   │   │   │   │   ├── TextInputQuestion.jsx
│   │   │   │   │   │   └── welcome-quiz.jsx
│   │   │   │   │   ├── create.jsx
│   │   │   │   │   ├── edit.jsx
│   │   │   │   │   ├── live.jsx
│   │   │   │   │   ├── preview.jsx
│   │   │   │   │   ├── publish.jsx
│   │   │   │   │   ├── questions.jsx
│   │   │   │   │   ├── settings.jsx
│   │   │   │   │   └── success.jsx
│   │   │   │   ├── quiz-tag
│   │   │   │   │   ├── create.jsx
│   │   │   │   │   ├── edit.jsx
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   └── show.jsx
│   │   │   │   ├── roles
│   │   │   │   │   ├── create.jsx
│   │   │   │   │   ├── edit.jsx
│   │   │   │   │   └── index.jsx
│   │   │   │   ├── teams
│   │   │   │   │   ├── create.jsx
│   │   │   │   │   ├── edit.jsx
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   └── show.jsx
│   │   │   │   ├── user
│   │   │   │   │   ├── Create.jsx
│   │   │   │   │   ├── Edit.jsx
│   │   │   │   │   └── Index.jsx
│   │   │   │   └── user-role-assignments
│   │   │   │       ├── create.jsx
│   │   │   │       ├── edit.jsx
│   │   │   │       ├── edit.jsx~
│   │   │   │       └── index.jsx
│   │   │   ├── analytics
│   │   │   │   ├── activity
│   │   │   │   │   ├── Index.jsx
│   │   │   │   │   ├── Logs.jsx
│   │   │   │   │   ├── Patterns.jsx
│   │   │   │   │   └── Sessions.jsx
│   │   │   │   ├── gamification
│   │   │   │   │   ├── Achievements.jsx
│   │   │   │   │   ├── Badges.jsx
│   │   │   │   │   ├── Index.jsx
│   │   │   │   │   ├── Points.jsx
│   │   │   │   │   └── Streaks.jsx
│   │   │   │   ├── leaderboard
│   │   │   │   │   ├── Categories.jsx
│   │   │   │   │   ├── Index.jsx
│   │   │   │   │   ├── Progress.jsx
│   │   │   │   │   └── Rankings.jsx
│   │   │   │   ├── participants
│   │   │   │   │   ├── Demographics.jsx
│   │   │   │   │   └── Index.jsx
│   │   │   │   ├── performance
│   │   │   │   │   ├── Index.jsx
│   │   │   │   │   ├── Questions.jsx
│   │   │   │   │   ├── Responses.jsx
│   │   │   │   │   ├── Scoring.jsx
│   │   │   │   │   └── TimeAnalysis.jsx
│   │   │   │   ├── quiz
│   │   │   │   │   ├── Comparison.jsx
│   │   │   │   │   ├── Overview.jsx
│   │   │   │   │   ├── Statistics.jsx
│   │   │   │   │   └── Trends.jsx
│   │   │   │   ├── AllAnalytics.jsx
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── auth
│   │   │   │   ├── confirm-password.jsx
│   │   │   │   ├── forgot-password.jsx
│   │   │   │   ├── login-component.jsx
│   │   │   │   ├── login.jsx
│   │   │   │   ├── register.jsx
│   │   │   │   ├── reset-password.jsx
│   │   │   │   └── verify-email.jsx
│   │   │   ├── blog
│   │   │   │   ├── create.jsx
│   │   │   │   ├── edit.jsx
│   │   │   │   ├── index.jsx
│   │   │   │   └── show.jsx
│   │   │   ├── blogcategory
│   │   │   │   ├── create.jsx
│   │   │   │   ├── edit.jsx
│   │   │   │   ├── index.jsx
│   │   │   │   └── show.jsx
│   │   │   ├── Bundles
│   │   │   │   ├── Demo.jsx
│   │   │   │   ├── Index.jsx
│   │   │   │   ├── MyBundles.jsx
│   │   │   │   ├── PaymentSuccess.jsx
│   │   │   │   ├── Purchase.jsx
│   │   │   │   └── Show.jsx
│   │   │   ├── Cart
│   │   │   │   └── Index.jsx
│   │   │   ├── country
│   │   │   │   ├── create.jsx
│   │   │   │   ├── edit.jsx
│   │   │   │   ├── index.jsx
│   │   │   │   └── show.jsx
│   │   │   ├── Errors
│   │   │   │   ├── BadRequest.jsx
│   │   │   │   ├── Forbidden.jsx
│   │   │   │   ├── NotFound.jsx
│   │   │   │   ├── ServerError.jsx
│   │   │   │   ├── ServiceUnavailable.jsx
│   │   │   │   ├── TooManyRequests.jsx
│   │   │   │   ├── Unauthorized.jsx
│   │   │   │   └── UnprocessableEntity.jsx
│   │   │   ├── notifications
│   │   │   │   ├── Index.jsx
│   │   │   │   └── NotificationPage.jsx
│   │   │   ├── Posts
│   │   │   │   ├── Create.jsx
│   │   │   │   └── Index.jsx
│   │   │   ├── quiz
│   │   │   │   ├── participation
│   │   │   │   │   ├── components
│   │   │   │   │   ├── attempt.jsx
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   ├── live-attempt.jsx
│   │   │   │   │   ├── lounge.jsx
│   │   │   │   │   ├── results.jsx
│   │   │   │   │   ├── start.jsx
│   │   │   │   │   ├── take.jsx
│   │   │   │   │   └── take_page_old.jsx
│   │   │   │   ├── index-refactored.jsx
│   │   │   │   ├── index.jsx
│   │   │   │   ├── MaxAttempts-Reached.jsx
│   │   │   │   └── show.jsx
│   │   │   ├── quizCategory
│   │   │   │   ├── create.jsx
│   │   │   │   ├── edit.jsx
│   │   │   │   ├── index.jsx
│   │   │   │   └── show.jsx
│   │   │   ├── ServerAnalytics
│   │   │   │   └── Dashboard.jsx
│   │   │   ├── settings
│   │   │   │   ├── appearance.jsx
│   │   │   │   ├── password.jsx
│   │   │   │   └── profile.jsx
│   │   │   ├── subject
│   │   │   │   ├── create.jsx
│   │   │   │   ├── edit.jsx
│   │   │   │   ├── index.jsx
│   │   │   │   └── show.jsx
│   │   │   ├── team
│   │   │   ├── web
│   │   │   │   ├── dashboard
│   │   │   │   │   ├── analytics
│   │   │   │   │   │   ├── categories.jsx
│   │   │   │   │   │   ├── performance.jsx
│   │   │   │   │   │   ├── progress.jsx
│   │   │   │   │   │   └── time.jsx
│   │   │   │   │   ├── reports
│   │   │   │   │   │   ├── export.jsx
│   │   │   │   │   │   ├── progress.jsx
│   │   │   │   │   │   └── quizzes.jsx
│   │   │   │   │   ├── social
│   │   │   │   │   │   ├── challenges.jsx
│   │   │   │   │   │   ├── friends.jsx
│   │   │   │   │   │   └── leaderboards.jsx
│   │   │   │   │   ├── streaks
│   │   │   │   │   │   ├── activity.jsx
│   │   │   │   │   │   ├── current.jsx
│   │   │   │   │   │   └── history.jsx
│   │   │   │   │   ├── achievements.jsx
│   │   │   │   │   ├── Activities.jsx
│   │   │   │   │   ├── analytics.jsx
│   │   │   │   │   ├── badges.jsx
│   │   │   │   │   ├── gamification.jsx
│   │   │   │   │   ├── leaderboards.jsx
│   │   │   │   │   ├── Overview.jsx
│   │   │   │   │   ├── Performance.jsx
│   │   │   │   │   ├── points.jsx
│   │   │   │   │   ├── profile.jsx
│   │   │   │   │   ├── Quizzes.jsx
│   │   │   │   │   ├── reports.jsx
│   │   │   │   │   ├── social.jsx
│   │   │   │   │   └── streaks.jsx
│   │   │   │   ├── home.jsx
│   │   │   │   ├── index.jsx
│   │   │   │   ├── quizzes.jsx
│   │   │   │   └── user-dashboard.jsx
│   │   │   ├── dashboard.jsx
│   │   │   ├── ErrorPage.jsx
│   │   │   └── welcome.jsx
│   │   ├── routes
│   │   │   ├── employers
│   │   │   │   ├── create.ts
│   │   │   │   ├── destroy.ts
│   │   │   │   ├── edit.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── show.ts
│   │   │   │   ├── store.ts
│   │   │   │   └── update.ts
│   │   │   ├── freelancers
│   │   │   │   ├── create.ts
│   │   │   │   ├── destroy.ts
│   │   │   │   ├── edit.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── show.ts
│   │   │   │   ├── store.ts
│   │   │   │   └── update.ts
│   │   │   ├── jobs
│   │   │   │   ├── create.ts
│   │   │   │   ├── destroy.ts
│   │   │   │   ├── edit.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── show.ts
│   │   │   │   ├── store.ts
│   │   │   │   └── update.ts
│   │   │   ├── micro-task-categories
│   │   │   │   ├── create.ts
│   │   │   │   ├── destroy.ts
│   │   │   │   ├── edit.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── show.ts
│   │   │   │   ├── store.ts
│   │   │   │   └── update.ts
│   │   │   ├── password
│   │   │   │   ├── confirm.ts
│   │   │   │   ├── edit.ts
│   │   │   │   ├── email.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── request.ts
│   │   │   │   ├── reset.ts
│   │   │   │   ├── store.ts
│   │   │   │   └── update.ts
│   │   │   ├── permissions
│   │   │   │   ├── create.ts
│   │   │   │   ├── destroy.ts
│   │   │   │   ├── edit.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── show.ts
│   │   │   │   ├── store.ts
│   │   │   │   └── update.ts
│   │   │   ├── posts
│   │   │   │   ├── create.ts
│   │   │   │   ├── destroy.ts
│   │   │   │   ├── edit.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── show.ts
│   │   │   │   ├── store.ts
│   │   │   │   └── update.ts
│   │   │   ├── profile
│   │   │   │   ├── destroy.ts
│   │   │   │   ├── edit.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── update.ts
│   │   │   ├── roles
│   │   │   │   ├── create.ts
│   │   │   │   ├── destroy.ts
│   │   │   │   ├── edit.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── show.ts
│   │   │   │   ├── store.ts
│   │   │   │   └── update.ts
│   │   │   ├── social
│   │   │   │   ├── callback.ts
│   │   │   │   ├── index.ts
│   │   │   │   └── login.ts
│   │   │   ├── status
│   │   │   │   ├── index.ts
│   │   │   │   └── update.ts
│   │   │   ├── users
│   │   │   │   ├── create.ts
│   │   │   │   ├── destroy.ts
│   │   │   │   ├── edit.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── show.ts
│   │   │   │   ├── store.ts
│   │   │   │   └── update.ts
│   │   │   ├── verification
│   │   │   │   ├── index.ts
│   │   │   │   ├── notice.ts
│   │   │   │   ├── send.ts
│   │   │   │   └── verify.ts
│   │   │   ├── about.ts
│   │   │   ├── appearance.ts
│   │   │   ├── dashboard.ts
│   │   │   ├── details.ts
│   │   │   ├── employeeDashoard.ts
│   │   │   ├── ForgotPassword.ts
│   │   │   ├── home.ts
│   │   │   ├── how-it-works.ts
│   │   │   ├── jobList.ts
│   │   │   ├── login.ts
│   │   │   ├── loginEx.ts
│   │   │   ├── logout.ts
│   │   │   ├── pricing.ts
│   │   │   ├── register.ts
│   │   │   └── SignUp.ts
│   │   ├── utils
│   │   │   ├── quizHelper.jsx
│   │   │   ├── quizReportHelper.jsx
│   │   │   └── tableUtils.jsx
│   │   ├── app.jsx
│   │   ├── ssr.jsx
│   │   └── ziggy.js
│   └── views
│       ├── admin
│       │   └── cache-settings
│       ├── analytics
│       │   ├── quiz-analytics-csv.blade.php
│       │   ├── quiz-analytics-excel.blade.php
│       │   ├── quiz-analytics-json.blade.php
│       │   └── quiz-analytics-report.blade.php
│       ├── emails
│       │   ├── password-reset.blade.php
│       │   └── verify-email-otp.blade.php
│       └── app.blade.php
├── routes
│   ├── api-versions
│   │   └── v-1
│   │       ├── admin.php
│   │       ├── analytics.php
│   │       ├── api-v1.php
│   │       ├── auth.php
│   │       └── participants.php
│   ├── admin.php
│   ├── analytics.php
│   ├── api.php
│   ├── auth.php
│   ├── bundles.php
│   ├── channels.php
│   ├── console.php
│   ├── module-management.php
│   ├── quiz.php
│   ├── settings.php
│   ├── user-profile.php
│   ├── web-api.php
│   └── web.php
├── scripts
│   ├── test-postman-signature.php
│   ├── test-security-headers.php
│   └── test-simple-hmac.php
├── tests
│   ├── Feature
│   │   ├── Auth
│   │   │   ├── AuthenticationTest.php
│   │   │   ├── EmailVerificationTest.php
│   │   │   ├── PasswordConfirmationTest.php
│   │   │   ├── PasswordResetTest.php
│   │   │   └── RegistrationTest.php
│   │   ├── Settings
│   │   │   ├── PasswordUpdateTest.php
│   │   │   └── ProfileUpdateTest.php
│   │   ├── AppSecurityJwtFlowTest.php
│   │   ├── AppSecuritySignatureTest.php
│   │   ├── DashboardTest.php
│   │   ├── ExampleTest.php
│   │   └── RealTimeAnalyticsTest.php
│   ├── Unit
│   │   └── ExampleTest.php
│   ├── load-test.js
│   ├── Pest.php
│   └── TestCase.php
├── ${project}-tree.txt
├── .editorconfig
├── .env
├── .env.backup
├── .env.example
├── .gitattributes
├── .gitignore
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── .rnd
├── artisan
├── bun.lock
├── components.json
├── composer.json
├── composer.lock
├── CRON_SETUP_GUIDE.md
├── DATABASE_MODULE_MANAGEMENT.md
├── deploy.sh
├── eslint.config.js
├── generate-page.js
├── index.php
├── LIVE_API_USAGE_GUIDE.md
├── package-lock.json
├── package.json
├── Pencilbox-Quiz-API.postman_collection.json.backup
├── Pencilbox-Quiz-API.postman_collection.json.bak
├── phpstan.neon
├── phpunit.xml
├── PURCHASE_SYSTEM_DOCUMENTATION.md
├── QUIZ_BUNDLES_FEATURE.md
├── Readme.md
├── README_APP_SECURITY.md
├── rector.php
├── REVENUE_TRACKING_DOCUMENTATION.md
├── server.js
├── tsconfig.json
└── vite.config.js
```