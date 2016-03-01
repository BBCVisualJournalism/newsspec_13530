define(['lib/news_special/bootstrap', 'bump-3'], function (news, bump) {
    var Video = function (opts) {
        this.selector = opts.selector;
        this.vpid = opts.vpid;
        this.holdingImage = opts.holdingImage;
        this.product = opts.product || 'news';
        this.autoplay = opts.autoplay || false;
        
        this.$videoContainer = news.$(this.selector);
        // this.$overlay = this.$videoContainer.find('.video-overlay');
        this.$audioControl = this.$videoContainer.find('.video-audio-control');
        this.$audioControlLabel = this.$audioControl.find('.video-audio-control-label');
        this.audioControlLabelOnText = this.$audioControl.attr('data-label-on');
        this.audioControlLabelOffText = this.$audioControl.attr('data-label-off');

        this.videoEl = bump(this.selector).find('.story-media-video');
        this.mp = null;

        // this.cta_breakpoint = 612;

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

            // if (this.getVideoWidth() >= this.cta_breakpoint) {
            //     this.disableSmpCta();
            // }
        },

        setEvents: function () {
            // this.mp.bind('ended', this.showOverlay.bind(this));
            this.mp.bind('playing', this.enterPlayingMode.bind(this));
            this.$audioControl.on('click', this.toggleAudio.bind(this));
            // news.$(window).on('resize', this.handleResize.bind(this));
        },

        enterPlayingMode: function () {
            // this.hideOverlay();
            if (this.product === 'background') {
                this.showAudioControls();
                this.updateAudioControlLabel();
            }
        },

        playVideo: function () {
            // this.hideOverlay();
            this.mp.play();
        },

        stopVideo: function () {
            // this.showOverlay();
            this.mp.stop();
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
        }

        // hideOverlay: function () {
        //     this.$overlay.addClass('video-overlay-hidden');
        // },

        // showOverlay: function () {
        //     this.$overlay.removeClass('video-overlay-hidden');
        // },

        // getVideoWidth: function () {
        //     return this.$videoContainer.width();
        // },

        // enableSmpCta: function () {
        //     var uiConfig = {
        //         cta: { enabled: true }
        //     };
        //     this.mp.updateUiConfig(uiConfig);
        // },

        // disableSmpCta: function () {
        //     var uiConfig = {
        //         cta: { enabled: false }
        //     };
        //     this.mp.updateUiConfig(uiConfig);
        // },

        // handleResize: function () {
        //     if (this.getVideoWidth() >= cta_breakpoint) {
        //         this.disableSmpCta();
        //     } else {
        //         this.enableSmpCta();
        //     }
        // }
    };

    return Video;
});
