CKEDITOR.dialog.add("lightbox_filer", function (g) {
    var l = CKEDITOR.plugins.link,

        m = function () {
            var a = this.getDialog(),
                k = this.getValue();
        },
        h = function (a) {
            a.advanced && this.setValue(a.advanced[this.id] || "");
        },
        j = function (a) {
            a.advanced || (a.advanced = {});
            a.advanced[this.id] = this.getValue() || ""
        },

        prev = function (a) {
            $('.cke_dialog .ImagePreview').html('<img src="' + this.getValue() + '" style="max-height:100px; max-width:450px;"/>');
        },
        getGal = function (a) {
            a.advanced || (a.advanced = {});
            gal = a.advanced["advCSSClasses"];
            gal = gal.split("ckelightboxgallery");
            gal = gal[1];
            a.advanced && this.setValue(gal || "");
        },
        setGal = function (a) {
            gal = this.getValue() || "";
        },
        c = g.lang.common,
        b = g.lang.link,
        d;

    function getImageUrl() {
        var url = dialog.getContentElement("info", "url");
        server_url = '/ckeditor_filer/url_image/' + $('#id_image').val() + '/';
        $.get(server_url, function (data) {
            console.log('getimg');
            url.setValue(data.url);
        });
    }

    return {
        title: "Lightbox Filer",
        minWidth: 350,
        minHeight: 300,
        contents: [
            {
                id: "info",
                label: b.info,
                title: b.info,
                elements: [
                    {
                        type: "vbox",
                        id: "urlOptions",
                        children: [
                            {
                                type: "hbox",
                                widths: "0",
                                children: [
                                    {
                                        type: "text",
                                        id: "url",
                                        label: g.lang.lightbox_filer.url,
                                        required: !0,
                                        onLoad: function () {
                                            this.allowOnChange = !0
                                        },
                                        onKeyUp: function () {
                                            this.allowOnChange = !1;
                                            var b = this.getValue(),
                                                k = /^((javascript:)|[#\/\.\?])/i;
                                            k.test(b);
                                            this.allowOnChange = !0;
                                        },
                                        onChange: function () {
                                            if (this.allowOnChange) this.onKeyUp();
                                            $('.cke_dialog .ImagePreview').html('<img src="' + this.getValue() + '" style="max-height:100px; max-width:450px;"/>');
                                        },
                                        validate: function () {
                                            var a = this.getDialog();
                                            return !g.config.linkJavaScriptLinksAllowed && /javascript\:/.test(this.getValue()) ? (alert(c.invalidValue), !1) : this.getDialog().fakeObj ? !0 : CKEDITOR.dialog.validate.notEmpty(b.noUrl).apply(this);

                                        },
                                        setup: function (a) {
                                            this.allowOnChange = !1;
                                            a.url && this.setValue(a.url.protocol != undefined ? a.url.protocol + a.url.url : a.url.url);
                                            this.allowOnChange = !0;
                                        },
                                        onShow: prev,
                                        commit: function (a) {
                                            a.type = "url";
                                            a.url || (a.url = {});
                                            a.url.protocol = "";
                                            a.advanced["advCSSClasses"] = "ckelightbox ckelightboxgallery" + gal;
                                            this.onChange();
                                            a.url || (a.url = {});
                                            a.url.url = this.getValue();
                                            this.allowOnChange = !1
                                        }
                                    },
                                    {
                                        type: 'html',
                                        html: '<div class="field-box field-image">' +
                                            '<img alt="no file selected" class="quiet" src="/static/filer/icons/nofile_48x48.png" id="id_image_thumbnail_img">' +
                                            '&nbsp;<span id="id_image_description_txt"></span>' +
                                            '<a onclick="return showRelatedObjectLookupPopup(this);" title="Pretraži" id="lookup_id_image" class="related-lookup" href="/admin/filer/folder/last/?t=file_ptr">' +
                                            '<img width="16" height="16" alt="Pretraži" src="/static/admin/img/icon_searchbox.png">' +
                                            '</a>' +
                                            '<img width="10" height="10" style="display: none;" title="Očisti" alt="Očisti" src="/static/admin/img/icon_deletelink.gif" id="id_image_clear">' +
                                            '<br><input type="text" id="id_image" name="image" class="vForeignKeyRawIdAdminField">' +
                                            '</div>'
                                    },
                                ]
                            },
                            {
                                id: "prev",
                                type: "html",
                                html: g.lang.lightbox_filer.preview + '<div class="ImagePreview" style="border:2px solid black; height:100px; text-align:center;"></div>'
                            },
                            {
                                type: "text",
                                label: g.lang.lightbox_filer.title,
                                requiredContent: "a[title]",
                                "default": "",
                                id: "advTitle",
                                setup: h,
                                commit: j
                            },
                            {
                                type: "text",
                                label: g.lang.lightbox_filer.gallery,
                                "default": "",
                                id: "advRel",
                                setup: getGal,
                                commit: setGal
                            }
                        ]
                    }
                ]
            }
        ],
        onShow: function () {
            dialog = CKEDITOR.dialog.getCurrent();
            var document = this.getElement().getDocument();
            // document = CKEDITOR.dom.document
            var id_image = document.getById('id_image');
            var oldVal = id_image.getValue();

            setInterval(function () {
                if (oldVal != id_image.getValue()) {
                    oldVal = id_image.getValue();
                    console.log(1);
                    getImageUrl();
                }
            }, 1000);
            if (id_image)
                id_image.hide();
            var id_image_clear = document.getById('id_image_clear');

            id_image_clear.on('click', function () {
                id_image.setValue("");
                id_image.removeAttribute("value");
                id_image_thumbnail_img = document.getById('id_image_thumbnail_img');
                id_image_thumbnail_img.setAttribute("src", "/static/filer/icons/nofile_48x48.png");
                id_image_description_txt = document.getById('id_image_description_txt');
                id_image_description_txt.setHtml("");
                id_image_clear = document.getById('id_image_clear');
                id_image_clear.hide();
            });


            $('.cke_dialog .ImagePreview').html('');
            var a =
                    this.getParentEditor(),
                b = a.getSelection(),
                c = null;
            (c = l.getSelectedLink(a)) && c.hasAttribute("href") ? b.getSelectedElement() || b.selectElement(c) : c = null;
            a = l.parseLinkAttributes(a, c);
            this._.selectedElement = c;
            this.setupContent(a);
        },
        onOk: function () {
            var a = {};
            this.commitContent(a);
            var b = g.getSelection(),
                c = l.getLinkAttributes(g, a);
            if (this._.selectedElement) {
                var e = this._.selectedElement,
                    d = e.data("cke-saved-href"),
                    f = e.getHtml();
                e.setAttributes(c.set);
                e.removeAttributes(c.removed);
                if (d == f) e.setHtml(c.set["data-cke-saved-href"]), b.selectElement(e);
                delete this._.selectedElement
            } else b = b.getRanges()[0], b.collapsed && (a = new CKEDITOR.dom.text(c.set["data-cke-saved-href"], g.document), b.insertNode(a), b.selectNodeContents(a)), c = new CKEDITOR.style({
                element: "a",
                attributes: c.set
            }), c.type = CKEDITOR.STYLE_INLINE, c.applyToRange(b, g), b.select()
        }
    }
});