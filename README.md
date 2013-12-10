# Blog

For some time now I have wanted to rewrite my own blog from the ground as a single page application.
With Angular JS ariving this seems to be easier than ever now.

There is allot of work to be done however.

# Vision

The overall idea is to create a blog where server and client are much more independent so people can choose weather they wan't to use NodeJS, Java, .NET, Rails or something completely different at the server end.

As for the client side, each "area" should be written as independent so modules can be added or removed as people see fit. The data model will be based around the idea of a document store that can be indexed if proper tools are available (e.g. Lucene for Java or Lucene.NET for .NET)

## Features

* Planned Modules:
 * Home - Main front page where all content types can be displayed in feed like manor or with other facets.
 * Blog - Articles, Category grouping etc.
 * Gallery - Picture streams, maybe be able to integrate with know services (flickr/instagram?)
 * About - Area where you can put things about your self.

* Domain Model:
 * Simple model based around "ContentType", meaning everything is just "content". Articles, Images, Comments, Tags, Categories etc.
 * Indexing done by Lucene or other software where possible.

* Templating - Simple angular templates, all done client side.
