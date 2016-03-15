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
                autoplay: this.autoplay,
                quality: 'high'
            };
            this.mp = this.videoEl.player(playerSettings);
            this.firstLoad = true;
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
                if (this.firstLoad && this.mp.muted()) {
                    this.firstLoad = false;
                    this.muted = false;
                    this.mp.muted(false);
                }
                this.updateAudioControlLabel();
                news.$(window).on('optimisedScroll', this.handleScroll.bind(this));
            }
        },

        playVideoIfPaused: function () {
            if (this.mp.paused()) {
                this.mp.play();
            }
        },

        pauseVideoIfPlaying: function () {
            if (!this.mp.paused()) {
                this.mp.pause();
            }
        },

        showAudioControls: function () {
            this.$audioControl.removeClass('video-overlay-hidden');
        },

        toggleAudio: function () {
            if (this.mp.muted()) {
                // if muted, unmute
                this.muted = false;
                this.mp.muted(false);
                news.istats.log('audio-unmuted', 'newsspec-interaction');
            } else {
                // if unmuted, mute
                this.muted = true;
                this.mp.muted(true);
                news.istats.log('audio-muted', 'newsspec-interaction');
            }
            this.updateAudioControlLabel();
        },

        updateAudioControlLabel: function () {
            if (this.mp.muted()) {
                this.$audioControlLabel.text(this.audioControlLabelOffText);
                this.$audioControl.addClass('video-audio-control-muted');
            } else {
                this.$audioControlLabel.text(this.audioControlLabelOnText);
                this.$audioControl.removeClass('video-audio-control-muted');
            }
        },

        handleScroll: function () {
            if (!this.muted) {
                var videoBottomScrollPosition = this.$videoContainer.outerHeight() + this.$videoContainer.offset().top;
                var windowScrollTop = news.$(window).scrollTop();
                var windowHeight = news.$(window).height();
                var newVolume;

                if (windowScrollTop > videoBottomScrollPosition) {
                    newVolume = 2 - (windowScrollTop / videoBottomScrollPosition);
                } else {
                    newVolume = 1;
                }
                
                if (newVolume < 0) {
                    newVolume = 0;
                }
                console.log(newVolume);
                this.mp.volume(newVolume);
            }
        }
    };

    return Video;
});
