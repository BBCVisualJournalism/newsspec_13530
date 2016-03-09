define(['lib/news_special/bootstrap', 'bump-3', 'utils'], function (news, bump, utils) {
    var Video = function (opts) {
        this.selector = opts.selector;
        this.vpid = opts.vpid;
        this.holdingImage = opts.holdingImage;
        this.product = opts.product || 'news';
        this.autoplay = opts.autoplay || false;
        
        this.$videoContainer = news.$(this.selector);
        this.$audioControl = this.$videoContainer.find('.video-audio-control');
        this.$audioControlLabel = this.$audioControl.find('.video-audio-control-label');
        this.audioControlLabelOnText = this.$audioControl.attr('data-label-on');
        this.audioControlLabelOffText = this.$audioControl.attr('data-label-off');

        this.videoEl = bump(this.selector).find('.story-media-video');
        this.mp = null;

        this.init();
    };

    Video.prototype = {
        init: function () {
            var playerSettings = {
                playlistObject: {
                    items: [{ vpid: this.vpid }],
                    holdingImageURL: this.holdingImage
                },
                product: this.product,
                responsive: true,
                autoplay: this.autoplay
            };
            this.mp = this.videoEl.player(playerSettings);
            this.mp.load();
            this.setEvents();
        },

        setEvents: function () {
            this.mp.bind('playing', this.enterPlayingMode.bind(this));
            this.$audioControl.on('click', this.toggleAudio.bind(this));
        },

        enterPlayingMode: function () {
            if (this.product === 'background') {
                this.showAudioControls();
                // audio on by default
                if (this.mp.muted()) {
                    this.mp.muted(false);
                }
                this.updateAudioControlLabel();
                news.$(window).on('optimisedScroll', this.handleScroll.bind(this));
            }
        },

        playVideoIfPaused: function () {
            if (this.mp.paused()) {
                console.log('playing video');
                this.mp.play();
            }
        },

        pauseVideoIfPlaying: function () {
            if (!this.mp.paused()) {
                console.log('pausing video');
                this.mp.pause();
            }
        },

        showAudioControls: function () {
            this.$audioControl.removeClass('video-overlay-hidden');
        },

        toggleAudio: function () {
            if (this.mp.muted()) {
                // if muted, unmute
                this.mp.muted(false);
            } else {
                // if unmuted, mute
                this.mp.muted(true);
            }
            this.updateAudioControlLabel();
        },

        updateAudioControlLabel: function () {
            if (this.mp.muted()) {
                this.$audioControlLabel.text(this.audioControlLabelOffText);
            } else {
                this.$audioControlLabel.text(this.audioControlLabelOnText);
            }
        },

        handleScroll: function () {
            if (utils.isElementInViewport(this.$videoContainer)) {
                this.playVideoIfPaused();
            } else {
                this.pauseVideoIfPlaying();
            }
        }
    };

    return Video;
});
